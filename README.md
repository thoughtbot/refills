[![Refills](http://images.thoughtbot.com/bourbon/refills-logo.svg)](http://refills.bourbon.io)

## Components and patterns built with Bourbon and Neat

**Note:** This project is no longer maintained.

- **[Examples & Code Snippets](http://refills.bourbon.io)**
- **[Changelog](https://github.com/thoughtbot/refills/releases)**
- **[Issues & Bugs](https://github.com/thoughtbot/refills/issues)**

Follow the [@bourbonsass](https://twitter.com/bourbonsass) Twitter account
for updates.

## Requirements

- [Sass] 3.3+
- [Bourbon] 5.0+
- [Neat] < 2.0, >= 1.6 (Refills is not currently compatible with Neat 2.0)

It’s recommended that you use [Autoprefixer], as Refills do not come packaged
with vendor prefixes.

[Sass]: https://github.com/sass/sass
[Bourbon]: https://github.com/thoughtbot/bourbon
[Neat]: https://github.com/thoughtbot/neat
[Autoprefixer]: https://github.com/postcss/autoprefixer

## Installation

1. Install Refills’ dependencies: [Bourbon](https://github.com/thoughtbot/bourbon#installation), [Neat](https://github.com/thoughtbot/neat#installation) and [jQuery](http://jquery.com/download) (if you plan to use any components that require JavaScript).

2. Go to the [Refills website](http://refills.bourbon.io), click “Show Code” under the component or pattern that you want and copy-paste it into your project.

3. Customize: Most of the components and patterns have a set of Sass variables that allow you to quickly tweak the look and feel.

## Installation for Ruby on Rails

Alternative to copy-pasting manually, we also have a Refills gem that allows you to add components and patterns via Rake tasks.

1. Add Refills to your Gemfile:

  ```ruby
  gem "refills", group: :development
  ```

2. Then run:

  ```bash
  bundle install
  ```

3. Use the following Rails generators:

  List all available snippets:

  ```bash
  rails generate refills:list
  ```

  Add a snippet:

  ```bash
  rails generate refills:import SNIPPET
  ```

  If you want to generate coffeescript instead of javascript, simply add `--coffee`

  ```bash
  rails generate refills:import SNIPPET --coffee
  ```

  This copies the snippet’s partial to `app/views/refills`, the stylesheet to `app/assets/stylesheets/refills` and the JavaScript to `app/assets/javascripts/refills`

## Miscellaneous

If your css reset file does not add webkit antialias, add the following code to your Scss file:

```css
body {
  -webkit-font-smoothing: antialiased;
}
```

## The Bourbon family

- [Bourbon](https://github.com/thoughtbot/bourbon): A lightweight Sass tool set
- [Neat](https://github.com/thoughtbot/neat): A lightweight semantic grid framework for Sass and Bourbon
- [Bitters](https://github.com/thoughtbot/bitters): Scaffold styles, variables and structure for Bourbon projects
- [Refills](https://github.com/thoughtbot/refills): Components and patterns built with Bourbon and Neat

## License

Copyright © 2014–2017 [thoughtbot, inc](http://thoughtbot.com). Refills is free software, and may be redistributed under the terms specified in the [license](LICENSE.md).

Whenever code for Refills is borrowed or inspired by existing code, we try to credit the original developer/designer in our source code. [Let us know](mailto:design+bourbon@thoughtbot.com) if you think any credit is absent.

## About

Refills is maintained by the thoughtbot design team. It is funded by
[thoughtbot, inc.][thoughtbot] and the names and logos for thoughtbot are
trademarks of thoughtbot, inc.

[![thoughtbot][thoughtbot-logo]][thoughtbot]

We love open-source software! See [our other projects][community] or
[hire us][hire] to design, develop, and grow your product.

[thoughtbot]: https://thoughtbot.com?utm_source=github
[thoughtbot-logo]: http://presskit.thoughtbot.com/images/thoughtbot-logo-for-readmes.svg
[community]: https://thoughtbot.com/community?utm_source=github
[hire]: https://thoughtbot.com/hire-us?utm_source=github
