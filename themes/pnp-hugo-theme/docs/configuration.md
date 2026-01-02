# Configurations

- [Configurations](#configurations)
  - [About Hugo Configurations](#about-hugo-configurations)
  - [Theme Parameters](#theme-parameters)
    - [Menu Items Configurations](#menu-items-configurations)
  - [Complete Example](#complete-example)
  - [Front Matter](#front-matter)
    - [Posts](#posts)

## About Hugo Configurations

This theme supports:

* [Analytics](/docs/analytics.md)

## Theme Parameters

These are all the parameters used by `pnp-hugo-theme` theme.

| Name                          | Type   | Required | Description                                      | Default                          | Example                                          |
| ----------------------------- | ------ | -------- | ------------------------------------------------ | -------------------------------- | ------------------------------------------------ |
| author                        | string | Yes      | Author name.                                     |                                  | `"Hugo Bernier"`                                     |                       |
| description                   | string | Yes      | Description of the site.                         |                                  | `"Cool PnP Web site"`                  |
| keywords                      | string | Yes      | Site keywords.                                   |                                  | `"blog,developer,personal"`                      |
| faviconSVG                    | string | No       | Custom path to a SCG favicon.                    | `"/img/favicon.svg"`             | `"/img/favicon.svg"`                             |
| favicon_32                    | string | No       | Custom path to a 32x32 favicon.                  | `"/img/favicon-32x32.png"`       | `"/img/favicon-32x32.png"`                       |
| favicon_16                    | string | No       | Custom path to a 16x16 favicon.                  | `"/img/favicon-16x16.png"`       | `"/img/favicon-16x16.png"`                       |
| touchIcon                     | string | No       | Custom path to an apple-touch-icon                      | `"/images/apple-touch-icon.png"` | `"/images/apple-touch-icon.png"`                 |
| mask_icon                     | string | No       | Custom path to a mask-icon                      | `"/images/safari-pinned-tab.svg"` | `"/images/safari-pinned-tab.svg"`                 |
| mask_icon_color                     | string | No       | Custom color for mask-icon color                      | `"#5bbad5"` | `"#5bbad5"`                 |                                          |                        |            |                             |
| customCSS                     | list   | No       | Add extra CSS files to the website.              | []                               | `["css/extra-style.css"]`                        |
| customSCSS                    | list   | No       | Add extra SCSS files to the website.             | []                               | `["scss/extra-style.scss"]`                      |
| customJS                      | list   | No       | Add extra JS files to the website.               | []                               | `["js/extra-script.js"]`                         |
| customRemoteJS                | list   | No       | Add extra remote JS files to the website.        | []                               | `["https://www.example.com/file.js"]`            |
| disablePnPTelemetry | bool | No | If true, disables telemetry for PnP components | `false` | `true` or `false` |
| rssFeedUrl | string | No | The URL to the RSS feed. Required if you include the "blog-feed" section. | `""` | `"https://pnp.github.io/blog/index.xml"` |
| bigLogo | [] | No | The big logo is used in the hero section. You can split the title into multiple lines if it's too long | [] | `[[line]]` |
| smallLogo | [] | No | The small logo is used in the hero section. You can split the title into multiple lines if it's too long | [] | `["Microsoft 365 & Power", "Platform Community"]` |


### Menu Items Configurations

Menu Items are optional. To use them you will need to set all the following required parameters for each icon.

| Configuration  | Type   | Required | Description                              | Example                         |
| -------------- | ------ | -------- | ---------------------------------------- | ------------------------------- |
| name           | string | Yes      | Menu Item name.                          | `"Posts"`                       |
| weight         | int    | Yes      | Menu Item order.                         | `1`                             |
| url            | string | Yes      | URL to redirect.                         | `"/posts/"`                     |
| class          | string | No       | Menu Item extra class attribute.         | `"menu-item"`                   |
| target         | string | No       | URL target attribute.                    | `"_blank"`                      |
| rel            | string | No       | URL rel attribute.                       | `"alternate"`                   |
| type           | string | No       | URL type attribute.                      | `"application/rss+xml"`         |

An example:

```toml
[[menu.main]]
  name = "Blog"
  weight = 1
  url  = "posts/"
[[menu.main]]
  name = "About"
  weight = 2
  url = "about/"
```

## Complete Example

This is a complete configuration example with some recommended values.

```toml
baseurl = "http://pnp.github.io"
title = "Microsoft 365 & Power Platform Community"
theme = "pnp-hugo-theme"
languagecode = "en"
defaultcontentlanguage = "en"


[params]
  author = "PnP Team"
  description = "Learn from others how to build apps on Microsoft 365 & Power Platform."
  keywords = "sharepoint,spfx,microsoft365,teams,graph,azure,developer"
  faviconSVG = "/img/favicon.svg"
  favicon_32 = "/img/favicon-32x32.png"
  favicon_16 = "/img/favicon-16x16.png"

  # customCSS = ["css/custom.css"]
  # customSCSS = ["scss/custom.scss"]
  # customJS = ["js/custom.js"]


# Menu links
[[menu.main]]
  name = "Blog"
  weight = 1
  url  = "posts/"
[[menu.main]]
  name = "About"
  weight = 2
  url = "about/"
```

## Front Matter

Hugo documentation: <https://gohugo.io/content-management/front-matter>

This theme includes one content type:

* [Posts](#posts), useful to display blog posts

### Posts

These are the front matter variables used by `hugo-coder` theme.

| Name             | Type   | Required | Description                                        | Default | Example                                                                         |
| ---------------- | ------ | -------- | -------------------------------------------------- | ------- | ------------------------------------------------------------------------------- |
| tags             | list   | No       | Add tag(s) to this post.                           |         | `["Hugo", "Go"]`                                                                |
| categories       | list   | No       | Add categorie(s) to this post.                     |         | `["Hugo", "Go"]`                                                                |
| series           | list   | No       | Add series to this post (used by OpenGraph).       |         | `["Theme Demo"]`                                                                |
| author           | list   | No       | Add author to this post.                           |         | `["John Doe"]`                                                                  |
| externalLink     | string | No       | Link to an external post.                          |         | `"https://github.com/luizdepra/hugo-coder/wiki"`                                |
| featuredImage    | string | No       | Link/path to add an image below post metadata.     |         | `"https://github.com/luizdepra/hugo-coder/blob/master/images/screenshot.png"`   |                                                              |
| canonicalUrl     | string | No       | Link to override <link rel="canonical"/> in <head> | `false` | `"https://my-company.com/blog/my-blog-post-that-I-repost-without-hurtiong-seo"` |

> "tags", "categories", "series" and "authors" are taxonomies defined in the `config.toml` file.
