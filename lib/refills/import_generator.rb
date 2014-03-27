require 'rails/generators'

module Refills
  class ImportGenerator < Rails::Generators::Base
    desc 'Copy refills'
    source_root File.expand_path("../../../source", __FILE__)
    argument :snippet, type: :string, required: true

    def copy_html
      copy_file "_#{snippet}.html.erb", "app/views/refills/_#{snippet}.html.erb"
    end

    def copy_styles
      copy_file "stylesheets/refills/_#{snippet}.scss", "app/assets/stylesheets/refills/_#{snippet}.scss"
    end
  end
end
