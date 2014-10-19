require 'bundler/gem_tasks'
require 'middleman-gh-pages'
require 'coffee-script'

require 'rspec/core/rake_task'
RSpec::Core::RakeTask.new(:spec)

desc 'Compile coffeescript -> javascript'
task :coffee do
  Dir['source/javascripts/refills/**/*.coffee'].each do |source|
    destination = source.gsub(%r{.coffee}, '.js')
    coffee = File.new(source).read
    javascript = CoffeeScript.compile(coffee)

    File.open(destination, 'w') do |file|
      file.write(javascript)
    end
  end
end

task :default => :spec
task :spec    => :coffee
task :build   => :spec
