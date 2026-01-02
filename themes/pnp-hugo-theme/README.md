# PnP Hugo Theme

This theme is for the PnP website and other PnP projects. It implements the [PnP styleguide](https://pnp.github.io/styleguide/).

## Getting started

Inside your project folder, copy the theme as a submodule:

```bash
git submodule add https://github.com/pnp/pnp-hugo-theme.git themes/pnp-hugo-theme
```

If you'd like some example content and an example config file to get started, you can copy the `exampleSite` directory into your root Hugo directory.

```bash
cp -r themes/pnp-hugo-theme/exampleSite/* ./
```

## Using the theme

*DON'T CHANGE THE THEME FILES*. If you need to change the theme, you should fork the theme and make your changes there. If you find a bug or have a feature request, please open an issue on the theme's GitHub repository.

If you need to override a theme file, you can copy the file into your project's `layouts` directory. For example, to override the `single.html` file, copy `themes/pnp-hugo-theme/layouts/_default/single.html` to `layouts/_default/single.html`.

Any file that is named the same in your project as in the theme will override the theme file.

For example, the theme's `layouts/index.html` is specifically designed for the https://pnp.github.io website. If you want your home page to look different, you should copy the theme's `layouts/index.html` file to your project's `layouts/index.html` and make your changes there.

## Using elements from the styleguide

Wherever possible, the theme has a `partial` template for every pattern in the styleguide. You can use these partials in your content files.


For example, if you want to use the [Logo Big](https://pnp.github.io/styleguide/?p=atoms-logo-big) pattern, you can use the `atoms-logo-big.html` partial in your content file like this:

```html
{{ partial "logos/big.html" . }}
```

Some partials require data to be passed to them. For example, the `atoms-logo-big.html` partial requires a the context object to be passed to it. If you need to pass individual parameters to a partial, use this approach:

```html
{{ partial "mypartial.html" (dict "title" "My PnP Site") }}
```

Please refer to each partial template in the theme to see what data is required.


## NOTE FOR BUILDING THE PnP THEME

If you're editing this site and changing the theme, you'll need to push the changes to the theme repo.

To do this, you'll need to:

```bash
cd themes/pnp-hugo-theme
```

Stage and commit your changes:

```bash
git add .
git commit -m "Your commit message"
```

Push your changes:

```bash
git push origin main
```

After you've pushed your changes, you'll need to update the submodule in your main project to point to the new commit. You can do this with the following commands:

```bash
cd ../..  # Go back to your project's root directory
git add themes/pnp-hugo-theme
git commit -m "Update theme submodule"
git push origin master
```