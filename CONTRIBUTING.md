# Contributing

We love pull requests from everyone. By participating in this project, you
agree to abide by the thoughtbot [code of conduct]. Here’s a quick guide:

[code of conduct]: https://thoughtbot.com/open-source-code-of-conduct

## HTML.erb

- Make sure that each component or pattern is independent of other components
  and patterns in the Refills library. There should be no dependencies between
  different components and patterns.

## Sass

All components and patterns should be fully responsive.

Avoid more than 2 levels of nesting for clarity and legibility of code.

Try to use as little styling as possible. Use the styles that come with Bitters
to keep everything consistent.

Put media queries inline, don’t separate them since that will create a lot of
repetitions of class names. If needed, for the sake of clarity, create a
specific variable for a media query if a certain breakpoint changes the
component/pattern drastically:

```scss
$tab-mode: $medium-screen;

@media (min-width: $tab-mode) { // $tab-mode is the same as $medium-screen here
  border-radius: 0;
}
```

Create variables for any color or size that might appear in a refill,
especially if it appears more than once in the component/pattern.

Declare the variables inside of the component/pattern’s class like below. Note
that variables should be interdependent to enable quick restyling.

```scss
.card {
  $card-background: tint($card-border-color, 10%);
  $card-border-color: $base-border-color;
  $card-border: 1px solid $card-border-color;
  …
}
```

## JavaScript

If you change any JavaScript, please run `rake coffee` afterwards to
generate the corresponding CoffeScript.

**NOTE** - do not manually change any of the CoffeeScript files, they are
automatically generated with `js2coffee`.

## Build

If you rename/remove/add any files to the repository, please make sure that the
build reflects that change. Add your changed file to the `SNIPPETS` constant in
the [test][spec_file] to have it tested.

[spec_file]: https://github.com/thoughtbot/refills/blob/master/spec/refills/import_generator_spec.rb
