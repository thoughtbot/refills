require 'bundler/gem_tasks'
require 'middleman-gh-pages'

require 'rspec/core/rake_task'
RSpec::Core::RakeTask.new(:spec)

desc "Compile javascript -> coffeescript"
task :coffee do
  destination = "source/javascripts/refills/coffeescript"
  Dir["source/javascripts/refills/**/*.js"].each do |source|
    filename = File.basename(source.gsub(/.js/, ".coffee"))

    `$(npm bin)/js2coffee #{source} > #{destination}/#{filename}`
  end

  puts "Please make sure that all generated coffeescript files are correct"
  puts "before committing the changes\n"
  puts `git status`
end

task default: :spec
task publish: :spec
