require 'rails/generators'

module Refills
  class ImportGenerator < Rails::Generators::Base
    desc 'Copy refills'
    source_root File.expand_path("../../../source", __FILE__)
    argument :snippet, type: :string, required: true

    def copy_html
      copy_file view_template, views_directory
    end

    def copy_styles
      copy_file stylesheet_template, stylesheets_directory
    end

    private

    def stylesheets_directory
      File.join('app', 'assets', 'stylesheets', 'refills', view_name(snippet_name))
    end

    def views_directory
      File.join('app', 'views', 'refills', stylesheet_name(snippet_name))
    end

    def view_template
      File.join(view_name(snippet))
    end

    def stylesheet_template
      File.join('stylesheets', 'refills', stylesheet_name(snippet))
    end

    def view_name(name)
      "_#{name}.html.erb"
    end

    def stylesheet_name(name)
      "_#{name}.scss"
    end

    def snippet_name
      snippet.gsub(/-/, '_')
    end
  end
end
