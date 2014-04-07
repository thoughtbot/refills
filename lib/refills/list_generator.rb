require 'rails/generators'

module Refills
  class ListGenerator < Rails::Generators::Base
    desc 'List refills'

    def list
      puts 'Available Refills'
      puts '================='
      stylesheets.each do |file_name|
        puts '- ' + file_name.gsub(/_|\.scss/, '')
      end
    end

    private
    def stylesheets
      refills_dir = File.expand_path('../../../source/stylesheets/refills', __FILE__)
      stylesheets = Dir.entries(refills_dir)
      stylesheets.reject {|f| f == '.' || f == '..' }
    end
  end
end
