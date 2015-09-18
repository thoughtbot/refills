header.navigation {
  $base-border-color: gainsboro !default;
  $base-border-radius: 3px !default;
  $action-color: #477DCA !default;
  $dark-gray: #333 !default;
  $large-screen: em(860) !default;
  $navigation-padding: 1em;
  $navigation-background: $dark-gray;
  $navigation-color: transparentize(white, 0.3);
  $navigation-color-hover: white;
  $navigation-height: 60px;
  $navigation-nav-button-background: $action-color;
  $navigation-nav-button-background-hover: lighten($navigation-background, 10%);
  $navigation-nav-button-border: 1px solid lighten($navigation-nav-button-background, 20%);
  $navigation-search-background: lighten($navigation-background, 5);
  $navigation-search-border: 1px solid darken($navigation-background, 5);
  $navigation-active-link-color: transparentize(white, 0.5);
  $navigation-submenu-padding: 1em;
  $navigation-submenu-width: 12em;
  $horizontal-bar-mode: $large-screen;

  background-color: $navigation-background;
  border-bottom: 1px solid darken($navigation-background, 10);
  min-height: $navigation-height;
  width: 100%;
  z-index: 999;

  .navigation-wrapper {
    @include clearfix;
    @include outer-container;
    position: relative;
    z-index: 9999;
  }

  .logo {
    float: left;
    max-height: $navigation-height;
    padding-left: $navigation-padding;
    padding-right: 2em;

    img {
      max-height: $navigation-height;
      padding: 0.8em 0;
    }
  }

  // Mobile view

  .navigation-menu-button {
    color: $navigation-color;
    display: block;
    float: right;
    line-height: $navigation-height;
    margin: 0;
    padding-right: 1em;
    text-decoration: none;
    text-transform: uppercase;

    @include media ($horizontal-bar-mode) {
      display: none;
    }

    &:focus,
    &:hover {
      color: $navigation-color-hover;
    }
  }

  // Nav menu

  nav {
    float: none;
    min-height: $navigation-height;
    z-index: 9999999;

    @include media ($horizontal-bar-mode) {
      float: left;
    }
  }

  ul.navigation-menu {
    clear: both;
    display: none;
    margin: 0 auto;
    overflow: visible;
    padding: 0;
    width: 100%;
    z-index: 9999;

    &.show {
      display: block;
    }

    @include media ($horizontal-bar-mode) {
      display: inline;
      margin: 0;
      padding: 0;
    }
  }

  // The nav items

  ul li.nav-link {
    background: $navigation-background;
    display: block;
    line-height: $navigation-height;
    overflow: hidden;
    padding-right: 0.8em;
    text-align: right;
    width: 100%;
    z-index: 9999;

    @include media ($horizontal-bar-mode) {
      background: transparent;
      display: inline;
      line-height: $navigation-height;
      text-decoration: none;
      width: auto;
    }

    a {
      color: $navigation-color;
      display: inline-block;
      text-decoration: none;

      @include media ($horizontal-bar-mode) {
        padding-right: 1em;
      }

      &:focus,
      &:hover {
        color: $navigation-color-hover;
      }
    }
  }

  .active-nav-item a {
    border-bottom: 1px solid $navigation-active-link-color;
    padding-bottom: 3px;
  }

  // Sub menus

  li.more.nav-link {
    padding-right: 0;

    @include media($horizontal-bar-mode) {
      padding-right: $navigation-submenu-padding;
    }

    > ul > li:first-child a  {
      padding-top: 1em;
    }

    a {
      margin-right: $navigation-submenu-padding;
    }

    > a {
      padding-right: 0.6em;
    }

    > a:after {
      @include position(absolute, auto -0.4em auto auto);
      content: '\25BE';
      color: $navigation-color;
    }
  }

  li.more {
    overflow: visible;
    padding-right: 0;

    a {
      padding-right: 0.8em;
    }

    > a {
      padding-right: 1.6em;
      position: relative;

      @include media($horizontal-bar-mode) {
        margin-right: $navigation-submenu-padding;
      }

      &:after {
        content: '›';
        font-size: 1.2em;
        position: absolute;
        right: $navigation-submenu-padding / 2;
      }
    }

    &:focus > .submenu,
    &:hover > .submenu {
      display: block;
    }

    @include media($horizontal-bar-mode) {
      padding-right: 0.8em;
      position: relative;
    }
  }

  ul.submenu {
    display: none;
    padding-left: 0;

    @include media($horizontal-bar-mode) {
      left: -$navigation-submenu-padding;
      position: absolute;
      top: 1.5em;
    }

    .submenu {
      @include media($horizontal-bar-mode) {
        left: $navigation-submenu-width - 0.2em;
        top: 0;
      }
    }

    li {
      display: block;
      padding-right: 0;

      @include media($horizontal-bar-mode) {
        line-height: $navigation-height / 1.3;

        &:first-child > a {
          border-top-left-radius: $base-border-radius;
          border-top-right-radius: $base-border-radius;
        }

        &:last-child > a {
          border-bottom-left-radius: $base-border-radius;
          border-bottom-right-radius: $base-border-radius;
          padding-bottom: 0.7em;
        }
      }

      a {
        background-color: darken($navigation-background, 3%);
        display: inline-block;
        text-align: right;
        width: 100%;

        @include media($horizontal-bar-mode) {
          background-color: $navigation-background;
          padding-left: $navigation-submenu-padding;
          text-align: left;
          width: $navigation-submenu-width;
        }
      }
    }
  }

  // Elements on the far right

  .navigation-tools {
    background: #505050;
    clear: both;
    display: block;
    height: $navigation-height;

    @include media($horizontal-bar-mode) {
      background: transparent;
      clear: none;
      float: right;
    }
  }

  // Search bar

  .search-bar {
    $search-bar-border-color: $base-border-color;
    $search-bar-border: 1px solid $search-bar-border-color;
    $search-bar-background: lighten($search-bar-border-color, 10%);

    float: left;
    padding: 0.85em 0.85em 0.7em 0.6em;
    width: 60%;

    form {
      position: relative;

      input[type=search] {
        @include box-sizing(border-box);
        background: $navigation-search-background;
        border-radius: $base-border-radius * 2;
        border: $navigation-search-border;
        color: $navigation-color;
        font-size: 0.9em;
        font-style: italic;
        margin: 0;
        padding: 0.5em 0.8em;
        width: 100%;

        @include media($horizontal-bar-mode) {
          width: 100%;
        }
      }

      button[type=submit] {
        background: $navigation-search-background;
        border: none;
        bottom: 0.3em;
        left: auto;
        outline: none;
        padding: 0 9px;
        position: absolute;
        right: 0.3em;
        top: 0.3em;

        img {
          height: 12px;
          opacity: 0.7;
          padding: 1px;
        }
      }
    }

    @include media($horizontal-bar-mode) {
      display: inline-block;
      position: relative;
      width: 16em;

      input {
        @include box-sizing(border-box);
        display: block;
      }
    }
  }
}
