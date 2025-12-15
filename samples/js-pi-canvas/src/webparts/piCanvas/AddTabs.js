RenderTabs = function()
{
    //The script in this funciton and the css below was developed by dustinpoissant
    //https://www.jqueryscript.net/other/Minimal-Handy-jQuery-Tabs-Plugin-AddTabs.html
    //Modified by @anthonyrhopkins to support web part labels (Image, etc.) with proper click handling
    if(typeof($add)=="undefined")var $add={version:{},auto:{disabled:false}};
    !function(a){
        $add.version.Tabs="1.2.0";
        $add.Tabs=function(d,s){
            return a(d).each(function(d,e){
                var t=a(e),
                    i=a.extend({change:"click"},t.data(),s),
                    n=t.find("[role=tabs]");
                n.addClass("addui-Tabs-tabHolder");
                var c=n.children(),
                    o=t.find("[role=contents]");
                o.addClass("addui-Tabs-contentHolder");
                var r=o.children(),
                    u=0;
                t.addClass("addui-Tabs").attr("role","").removeAttr("role");
                c.addClass("addui-Tabs-tab");
                r.addClass("addui-Tabs-content").each(function(d,s){
                    a(s).hasClass("active")&&(a(s).removeClass("active"),u=d);
                });
                r.removeClass("addui-Tabs-active").eq(u).addClass("addui-Tabs-active");
                c.removeClass("addui-Tabs-active").eq(u).addClass("addui-Tabs-active");

                var l="click";
                if("hover"==i.change){l="mouseenter";}

                // Enhanced click handler that works with nested elements (like Image web parts as labels)
                c.on(l,function(evt){
                    // Prevent default behavior (stops Image web part from opening fullscreen)
                    evt.preventDefault();
                    evt.stopPropagation();

                    // Find which tab was clicked (could be the tab itself or a child element)
                    var clickedTab = a(evt.target).closest('.addui-Tabs-tab');
                    if(clickedTab.length === 0) return;

                    // Find the index of the clicked tab
                    c.each(function(d,s){
                        if(a(s).is(clickedTab)){
                            u=d;
                            r.removeClass("addui-Tabs-active").eq(u).addClass("addui-Tabs-active");
                            c.removeClass("addui-Tabs-active").eq(u).addClass("addui-Tabs-active");
                        }
                    });
                });

                // Also prevent default on any clickable elements inside tabs (images, buttons, links)
                c.find('a, button, img, [role="button"]').on('click', function(evt){
                    evt.preventDefault();
                    evt.stopPropagation();
                    // Trigger click on parent tab
                    a(this).closest('.addui-Tabs-tab').trigger('click');
                });
            });
            return this;
        };
        a.fn.addTabs=function(a){$add.Tabs(this,a);};
        $add.auto.Tabs=function(){$add.auto.disabled||a("[data-addui=tabs]").addTabs();};
    }(jQuery);
    $(function(){for(var k in $add.auto){if(typeof($add.auto[k])=="function"){$add.auto[k]();}}});
}