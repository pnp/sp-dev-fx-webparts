/**
 * PiCanvas Tabs Library v3.0.0
 *
 * Originally based on AddTabs by dustinpoissant
 * https://www.jqueryscript.net/other/Minimal-Handy-jQuery-Tabs-Plugin-AddTabs.html
 *
 * Enhanced by @anthonyrhopkins with:
 * - WCAG 2.2 accessibility (ARIA roles, keyboard navigation)
 * - Web part labels support (Image, etc.)
 * - Lazy loading hooks
 * - Reduced motion support
 * - Deep linking support
 * - Banner/Hero webpart full-width fix
 */
RenderTabs = function() {
    if (typeof($add) == "undefined") var $add = { version: {}, auto: { disabled: false } };

    !function(a) {
        $add.version.Tabs = "3.0.0";

        /**
         * Fix SharePoint Banner/Hero webpart width issues when moved into tabs.
         * 
         * SharePoint Banner webpart configurations:
         * 1. "Image and heading" - background image with text overlay
         * 2. "Heading only" - just text, colored background
         * 3. "Color block" - solid color with text
         * 4. "Fade" - image fades into page background  
         * 5. "Overlap" - image with overlapping text box
         * 
         * All configurations use deeply nested flex containers with inline styles
         * that contain calculated pixel widths. When the webpart is moved via DOM
         * manipulation, these calculations become stale and must be reset.
         * 
         * @param {jQuery} $container - The tab content container to fix
         */
        function fixBannerWebparts($container) {
            // Find all Banner webparts in this container
            var $banners = $container.find('[data-automation-id="BannerWebPart"], [class*="bannerWebPart"], [class*="BannerWebPart"]');
            
            if ($banners.length === 0) return;
            
            $banners.each(function() {
                var $banner = a(this);
                
                // Step 1: Remove ALL inline width/max-width/flex styles from the banner and ALL descendants
                // SharePoint injects these via React after render with calculated pixel values
                $banner.find('*').addBack().each(function() {
                    var el = this;
                    var style = el.style;
                    
                    // Clear width-related inline styles
                    if (style.width) style.width = '';
                    if (style.maxWidth) style.maxWidth = '';
                    if (style.minWidth) style.minWidth = '';
                    if (style.flex) style.flex = '';
                    if (style.flexBasis) style.flexBasis = '';
                    if (style.flexGrow) style.flexGrow = '';
                    if (style.flexShrink) style.flexShrink = '';
                });
                
                // Step 2: Add marker class so CSS can target fixed banners
                $banner.addClass('picanvas-banner-fixed');
                
                // Step 3: Force the banner to recalculate its layout
                // Reading offsetHeight forces a reflow
                void $banner[0].offsetHeight;
            });
            
            // Also fix Hero webparts (similar structure to Banner)
            var $heroes = $container.find('[data-automation-id="HeroWebPart"], [class*="heroWebPart"], [class*="HeroWebPart"]');
            
            $heroes.each(function() {
                var $hero = a(this);
                
                $hero.find('*').addBack().each(function() {
                    var el = this;
                    var style = el.style;
                    
                    if (style.width) style.width = '';
                    if (style.maxWidth) style.maxWidth = '';
                    if (style.minWidth) style.minWidth = '';
                    if (style.flex) style.flex = '';
                    if (style.flexBasis) style.flexBasis = '';
                    if (style.flexGrow) style.flexGrow = '';
                    if (style.flexShrink) style.flexShrink = '';
                });
                
                $hero.addClass('picanvas-hero-fixed');
                void $hero[0].offsetHeight;
            });
        }

        $add.Tabs = function(d, s) {
            return a(d).each(function(d, e) {
                var t = a(e),
                    i = a.extend({ change: "click" }, t.data(), s),
                    n = t.find("[role=tabs]"),
                    uniqueId = 'picanvas-' + Math.random().toString(36).substr(2, 9);

                n.addClass("addui-Tabs-tabHolder");

                var c = n.children(),
                    o = t.find("[role=contents]");
                o.addClass("addui-Tabs-contentHolder");

                var r = o.children(),
                    u = 0;

                t.addClass("addui-Tabs").attr("role", "").removeAttr("role");
                c.addClass("addui-Tabs-tab");

                r.addClass("addui-Tabs-content").each(function(d, s) {
                    a(s).hasClass("active") && (a(s).removeClass("active"), u = d);
                });

                r.removeClass("addui-Tabs-active").eq(u).addClass("addui-Tabs-active");
                c.removeClass("addui-Tabs-active").eq(u).addClass("addui-Tabs-active");

                // ========== FIX BANNER WEBPARTS IN ALL TAB PANELS ==========
                // Must run immediately after tabs are set up, before they're hidden
                r.each(function() {
                    fixBannerWebparts(a(this));
                });

                // ========== WCAG 2.2 ACCESSIBILITY ==========

                // Add ARIA role to tab list container
                n.attr({
                    'role': 'tablist',
                    'aria-label': t.attr('data-aria-label') || 'Content sections'
                });

                // Check if vertical orientation
                var isVertical = t.attr('data-tab-orientation') === 'vertical';
                if (isVertical) {
                    n.attr('aria-orientation', 'vertical');
                }

                // Add ARIA attributes to each tab
                c.each(function(index) {
                    var $tab = a(this);
                    var tabId = uniqueId + '-tab-' + index;
                    var panelId = uniqueId + '-panel-' + index;

                    $tab.attr({
                        'role': 'tab',
                        'id': tabId,
                        'aria-selected': index === u ? 'true' : 'false',
                        'aria-controls': panelId,
                        'tabindex': index === u ? '0' : '-1'
                    });

                    // Check if this is a placeholder (restricted) tab
                    if ($tab.attr('data-placeholder') === 'true') {
                        $tab.attr('aria-disabled', 'true');
                    }
                });

                // Add ARIA attributes to each content panel
                r.each(function(index) {
                    var $panel = a(this);
                    var tabId = uniqueId + '-tab-' + index;
                    var panelId = uniqueId + '-panel-' + index;

                    $panel.attr({
                        'role': 'tabpanel',
                        'id': panelId,
                        'aria-labelledby': tabId,
                        'tabindex': '0'
                    });

                    // Mark non-active panels as hidden from screen readers
                    if (index !== u) {
                        $panel.attr('aria-hidden', 'true');
                    }
                });

                // ========== REDUCED MOTION SUPPORT ==========

                var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                var transitionsDisabled = t.attr('data-transitions') === 'false';

                if (prefersReducedMotion || transitionsDisabled) {
                    t.addClass('picanvas-no-transitions');
                }

                // ========== TAB ACTIVATION FUNCTION ==========

                function activateTab(newIndex, focusTab) {
                    // Skip if clicking on placeholder tab
                    var $newTab = c.eq(newIndex);
                    if ($newTab.attr('data-placeholder') === 'true') {
                        return false;
                    }

                    // Update active states
                    r.removeClass("addui-Tabs-active").attr('aria-hidden', 'true');
                    r.eq(newIndex).addClass("addui-Tabs-active").removeAttr('aria-hidden');

                    c.removeClass("addui-Tabs-active")
                     .attr('aria-selected', 'false')
                     .attr('tabindex', '-1');
                    $newTab.addClass("addui-Tabs-active")
                           .attr('aria-selected', 'true')
                           .attr('tabindex', '0');

                    u = newIndex;

                    // Focus management
                    if (focusTab) {
                        $newTab.focus();
                    }

                    // ========== LAZY LOADING ==========

                    var $panel = r.eq(newIndex);
                    if ($panel.attr('data-lazy') === 'true' && $panel.attr('data-lazy-loaded') !== 'true') {
                        // Mark as loaded
                        $panel.attr('data-lazy-loaded', 'true');

                        // Trigger custom event for mermaid/custom content initialization
                        $panel.trigger('picanvas:lazy-load', { tabIndex: newIndex });

                        // Load any lazy iframes
                        $panel.find('iframe[data-src]').each(function() {
                            var $iframe = a(this);
                            $iframe.attr('src', $iframe.attr('data-src'));
                            $iframe.removeAttr('data-src');
                        });
                    }

                    // Trigger custom event for deep linking and analytics
                    t.trigger('picanvas:tab-change', {
                        tabIndex: newIndex,
                        tabElement: $newTab,
                        panelElement: $panel
                    });

                    // ========== FORCE BACKGROUND IMAGES TO LOAD ==========
                    // SharePoint Hero/Banner web parts use lazy loading that depends on
                    // IntersectionObserver. When tabs are hidden (display:none), images
                    // don't load. Trigger resize to force SharePoint to re-evaluate.
                    setTimeout(function() {
                        // Method 1: Trigger resize event for IntersectionObserver refresh
                        window.dispatchEvent(new Event('resize'));

                        // Method 2: Fix Banner/Hero webparts that may have re-injected styles
                        fixBannerWebparts($panel);

                        // Method 3: Force re-layout of elements with background-image
                        $panel.find('[style*="background-image"]').each(function() {
                            var $el = a(this);
                            // Force reflow by reading offsetHeight
                            void $el[0].offsetHeight;
                        });

                        // Method 4: Handle SharePoint's lazy image loading
                        // Look for placeholder images that need to be loaded
                        $panel.find('img[data-src], img[loading="lazy"]').each(function() {
                            var $img = a(this);
                            if ($img.attr('data-src')) {
                                $img.attr('src', $img.attr('data-src'));
                                $img.removeAttr('data-src');
                            }
                            // Force image reload
                            if ($img.attr('loading') === 'lazy') {
                                var src = $img.attr('src');
                                if (src) {
                                    $img.attr('src', '');
                                    $img.attr('src', src);
                                }
                            }
                        });
                    }, 50);

                    return true;
                }

                // ========== CLICK HANDLER ==========

                var l = "click";
                if ("hover" == i.change) { l = "mouseenter"; }

                // Enhanced click handler that works with nested elements
                c.on(l, function(evt) {
                    evt.preventDefault();
                    evt.stopPropagation();

                    var clickedTab = a(evt.target).closest('.addui-Tabs-tab');
                    if (clickedTab.length === 0) return;

                    var newIndex = c.index(clickedTab);
                    if (newIndex >= 0 && newIndex !== u) {
                        activateTab(newIndex, false);
                    }
                });

                // Prevent default on clickable elements inside tabs
                c.find('a, button, img, [role="button"]').on('click', function(evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    a(this).closest('.addui-Tabs-tab').trigger('click');
                });

                // ========== KEYBOARD NAVIGATION (WCAG 2.1.1) ==========

                n.on('keydown', '.addui-Tabs-tab', function(e) {
                    var $tabs = c;
                    var currentIndex = $tabs.index(this);
                    var newIndex = currentIndex;
                    var tabCount = $tabs.length;

                    // Determine navigation keys based on orientation
                    var nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
                    var prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';

                    switch(e.key) {
                        case nextKey:
                            // Move to next tab (wrap around)
                            newIndex = (currentIndex + 1) % tabCount;
                            e.preventDefault();
                            break;

                        case prevKey:
                            // Move to previous tab (wrap around)
                            newIndex = (currentIndex - 1 + tabCount) % tabCount;
                            e.preventDefault();
                            break;

                        case 'Home':
                            // Move to first tab
                            newIndex = 0;
                            e.preventDefault();
                            break;

                        case 'End':
                            // Move to last tab
                            newIndex = tabCount - 1;
                            e.preventDefault();
                            break;

                        case 'Enter':
                        case ' ':
                            // Activate current tab
                            activateTab(currentIndex, false);
                            e.preventDefault();
                            return;

                        default:
                            return;
                    }

                    // Skip placeholder tabs
                    var attempts = 0;
                    while ($tabs.eq(newIndex).attr('data-placeholder') === 'true' && attempts < tabCount) {
                        if (e.key === nextKey || e.key === 'End') {
                            newIndex = (newIndex + 1) % tabCount;
                        } else {
                            newIndex = (newIndex - 1 + tabCount) % tabCount;
                        }
                        attempts++;
                    }

                    if (newIndex !== currentIndex) {
                        activateTab(newIndex, true);
                    }
                });

                // ========== DEEP LINKING SUPPORT ==========

                // Expose activation function for external use (deep linking)
                t.data('picanvas-activate-tab', function(index) {
                    if (index >= 0 && index < c.length) {
                        activateTab(index, false);
                    }
                });

                // Expose method to get tab by label text
                t.data('picanvas-find-tab', function(labelText) {
                    var foundIndex = -1;
                    c.each(function(index) {
                        var tabText = a(this).text().trim().toLowerCase().replace(/\s+/g, '-');
                        if (tabText === labelText.toLowerCase().replace(/\s+/g, '-')) {
                            foundIndex = index;
                            return false;
                        }
                    });
                    return foundIndex;
                });

                // Initialize first tab's lazy content
                var $firstPanel = r.eq(u);
                if ($firstPanel.attr('data-lazy') === 'true') {
                    $firstPanel.attr('data-lazy-loaded', 'true');
                    setTimeout(function() {
                        $firstPanel.trigger('picanvas:lazy-load', { tabIndex: u });
                    }, 0);
                }

                // Force background images to load on first tab after SharePoint finishes rendering
                // SharePoint Hero/Banner web parts set background-image via React after initial mount
                setTimeout(function() {
                    window.dispatchEvent(new Event('resize'));
                    $firstPanel.find('[style*="background-image"]').each(function() {
                        void a(this)[0].offsetHeight;
                    });
                }, 100);

                // Also trigger after a longer delay for slow-loading SharePoint components
                setTimeout(function() {
                    window.dispatchEvent(new Event('resize'));
                }, 500);
            });

            return this;
        };

        a.fn.addTabs = function(a) { $add.Tabs(this, a); };
        $add.auto.Tabs = function() { $add.auto.disabled || a("[data-addui=tabs]").addTabs(); };
    }(jQuery);

    $(function() {
        for (var k in $add.auto) {
            if (typeof($add.auto[k]) == "function") {
                $add.auto[k]();
            }
        }
    });
}
