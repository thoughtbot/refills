# Refills

## Prepackaged patterns and components, built on top of Bourbon, Bitters, and Neat


[Bourbon](http://bourbon.io/) provides Sass mixins and eliminates vendor prefixes, for faster CSS coding.

[Neat](http://neat.bourbon.io/) provides a lightweight grid framework.

[Bitters](http://bitters.bourbon.io/) provides basic variables and structure to a Bourbon/Neat project.

[Refills](http://thoughtbot.github.io/refills/) provides "copy-paste" components and patterns based on Bourbon, Neat and Bitters.


See examples and get the code snippets [here](http://thoughtbot.github.io/refills/)

# Installing Dependencies

[Install Bourbon](http://bourbon.io/)

[Install Neat](http://neat.bourbon.io/)

[Install Bitters](http://bitters.bourbon.io/)


Make sure the following lines in "_bitters.scss" are uncommented:

```scss
@import "neat-helpers"; // or "neat/neat-helpers" when not in Rails
@import "grid-settings";
```


[Install jQuery](http://www.w3schools.com/jquery/jquery_install.asp) (if you are using any of the components/patterns that require Javascript. Javascript, when used, can be found at the bottom of the HTML file.)

Click "Show Code" under the component/pattern you want in [Refills](http://thoughtbot.github.io/refills/) and paste it into your project. 
If a component/pattern has javascript it is placed in the HTML.erb file. Feel free to place it somewhere else in your project.

# Using Refills

* Click the "Show Code" link under the component/pattern you want to copy to your project and use the "copy" buttons to get the code to your clipboard. 
* If a component uses Javascript, that code will be included at the bottom of the HTML file.
* Each component/pattern has a set of variables at the very top of its Scss file. These pull out the most important properties of the component/pattern to enable quick changes of color, size and general appearance. 


#### Using Refills with a Rails project
Refills can be used by simply copy-pasting components/patterns from the site but if you prefer adding them via rake tasks, follow these steps:

Add gem to your Gemfile

    gem 'refills'

The gem provides the following Rails generators

* `rails generate refills:list`
Lists all the available snippets

* `rails generate refills:import SNIPPET`
Copies partials to `app/views/refills` and stylesheets to
`app/assets/stylesheets/refills`

# Submitting components or patterns

You are more than welcome to submit any component or pattern you can't find in the library, or feel free to send requests for content you'd like to see. When submitting a pull request, please think of these style guides:

#### HTML.erb

* Make sure that each component/pattern is independent of other components/patterns in the Refills library. There should be no dependencies between different components/patterns.

#### Scss

All components/pattern should be fully responsive and follow the [Neat examples](http://neat.bourbon.io/examples/).

Avoid more than 2 levels of nesting for clarity and legibility of code.

Try to use as little styling as possible. Use the styles that come with Bitters to keep everything consistent.

Put media queries inline, don't separate them since that will create a lot of repetitions of class names. If needed, for the sake of clarity, create a specific variable for a media query if a certain breakpoint changes the component/pattern drastically:

      $tab-mode: $medium-screen;
      
      @include media($tab-mode) { // $tab-mode is the same as $medium-screen here
        border-radius: 0;
      }

Create variables for any color or size that might appear in a refill, Especially if it appears more than once in the component/pattern.

Declare the variables inside of the component/pattern's class like below. Note that variables should be interdependent to enable quick restyling.

    .card {
      $card-border-color: $base-border-color;
      $card-border: 1px solid $card-border-color;
      $card-background: lighten($card-border-color, 10);
      ...

# Credits

![thoughtbot](http://thoughtbot.com/images/tm/logo.png)

Refills is maintained and funded by [thoughtbot, inc](http://thoughtbot.com/community). Whenever a code snippet is borrowed or inspired by existing code, we try to credit the original developer/designer in our source code. Let us know if you think we have missed to do this.

# License

Refills is Copyright © 2014 thoughtbot. It is free software, and may be redistributed under the terms specified in the LICENSE file.
