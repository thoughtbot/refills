require 'rails/generators'

module Refills
  class ImportGenerator < Rails::Generators::Base
    desc 'Copy refills'
    source_root File.expand_path("../../../source", __FILE__)
    argument :snippet, type: :string, required: true

    def copy_html
      copy_file view_name(snippet), view_destination
    end

    def copy_styles
      copy_file stylesheet_template, stylesheet_destination
    end

    def copy_javascripts
      copy_file javascript_template, javascript_destination
    end

    private

    def javascript_destination
      File.join('app', 'assets', 'javascripts', 'refills', javascript_name(snippet_name))
    end

    def stylesheet_destination
      File.join('app', 'assets', 'stylesheets', 'refills', stylesheet_name(snippet_name))
    end

    def view_destination
      File.join('app', 'views', 'refills', view_name(snippet_name))
    end

    def stylesheet_template
      File.join('stylesheets', 'refills', stylesheet_name(snippet))
    end

    def javascript_template
      File.join('javascripts', 'refills', javascript_name(snippet))
    end

    def view_name(name)
      "_#{name}.html.erb"
    end

    def stylesheet_name(name)
      "_#{name}.scss"
    end

    def javascript_name(name)
      "_#{name}.js"
    end

    def snippet_name
      snippet.underscore
    end
  end
end
