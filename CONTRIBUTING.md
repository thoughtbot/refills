# Contributing

You are more than welcome to submit any component or pattern you can’t find in the library, or feel free to send requests for content you’d like to see. When submitting a pull request, please think of these style guides:

## HTML.erb

- Make sure that each component or pattern is independent of other components and patterns in the Refills library. There should be no dependencies between different components and patterns.

## Sass

All components and patterns should be fully responsive and follow the [Neat examples](http://neat.bourbon.io/examples).

Avoid more than 2 levels of nesting for clarity and legibility of code.

Try to use as little styling as possible. Use the styles that come with Bitters to keep everything consistent.

Put media queries inline, don’t separate them since that will create a lot of repetitions of class names. If needed, for the sake of clarity, create a specific variable for a media query if a certain breakpoint changes the component/pattern drastically:

```scss
$tab-mode: $medium-screen;

@include media($tab-mode) { // $tab-mode is the same as $medium-screen here
  border-radius: 0;
}
```

Create variables for any color or size that might appear in a refill, especially if it appears more than once in the component/pattern.

Declare the variables inside of the component/pattern’s class like below. Note that variables should be interdependent to enable quick restyling.

```scss
.card {
  $card-background: tint($card-border-color, 10%);
  $card-border-color: $base-border-color;
  $card-border: 1px solid $card-border-color;
  …
}
```
