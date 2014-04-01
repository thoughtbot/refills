require 'rails/generators'

module Refills
  class ImportGenerator < Rails::Generators::Base
    desc 'Copy refills'
    source_root File.expand_path("../../../source", __FILE__)
    argument :snippet, type: :string, required: true

    def copy_html
      copy_file view_template, view_destination
    end

    def copy_styles
      copy_file stylesheet_template, stylesheet_destination
    end

    private

    def stylesheet_destination
      File.join(stylesheets_directory, stylesheet_name(snippet_name))
    end


    def view_destination
      File.join(views_directory, view_name(snippet_name))
    end

    def stylesheets_directory
      File.join('app', 'assets', 'stylesheets', 'refills')
    end

    def views_directory
      File.join('app', 'views', 'refills')
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
