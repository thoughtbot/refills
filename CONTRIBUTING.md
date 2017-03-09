# Contributing

We love pull requests from everyone. By participating in this project, you
agree to abide by the thoughtbot [code of conduct]. Here's a quick guide:

1. [Fork the repository][fork] and clone to your machine.
2. Run `bin/setup`.
3. Rune `bundle exec middleman server` to start the middleman server.
4. Make your change, following our style guide (below). Write tests.
5. Write a [good commit message][commit]. Push to your fork and
   [submit a pull request][pr]. If [Hound] catches style violations, fix them.
6. Wait for us. We try to at least comment on pull requests within one week. We
   may suggest changes.

  [code of conduct]: https://thoughtbot.com/open-source-code-of-conduct
  [fork]: https://github.com/thoughtbot/refills/fork
  [commit]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
  [pr]: https://github.com/thoughtbot/refills/compare/
  [hound]: https://houndci.com

## Guiding principles

- Each component is independent of other components and patterns in
  the Refills library. There should be no dependencies between different
  components.
- Each component is minimally opinionated about visual design.
- Each component focuses on accessible interaction and experience.
- Each component is grid independent.

## The makeup of a component

- A description should be added to the [refills template], sorted
  alphabetically. Any external references should also be noted.
- Create a `refills/_COMPONENT.scss` partial, and import it from the
  [Sass manifest].
- Create a template, `refills/COMPONENT.html.erb`, with your markup.
- If needed, create a `refills/_COMPONENT.js` script, and require it from the
  [JavaScript manifest].

  [refills template]: source/refills.html.erb
  [Sass manifest]: source/stylesheets/site.css.scss
  [JavaScript manifest]: source/javascripts/all.js

## The website

- Styling for the website is scoped to the [`site`] stylesheets directory, and
  imported below component styling.
- Variables that are not included in the Bitters defaults go in
  the `site/variables` partial. This is imported below component styling.
  `base/variables` should never be touched, except when updating for the most
  recent version of Bitters. This helps minimize variable and style conflicts
  for people copying components into their own codebases.
- When they're necessary, [utility classes] are prefixed with `u-`.

  [`site`]: source/stylesheets/site
  [`site/variables`]: source/stylesheets/site/_variables.scss
  [`base/variables`]: source/stylesheets/base/_variables.scss
  [utility classes]: https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/#utility-namespaces-u-

## Build and Deploy

The middleman website is hosted on [Netlify], which will run the build and
deploy any changes every time a commit is merge to `master`.

  [Netlify]: http://netlify.com
