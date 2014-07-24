require 'erubis'
require 'lib/snippet_helpers'

activate :directory_indexes

set :css_dir, 'stylesheets'
set :images_dir, 'images'
set :js_dir, 'javascripts'

helpers SnippetHelpers

ready do
  sprockets.append_path 'vendor/stylesheets'
  sprockets.append_path 'vendor/javascripts'
end

configure :development do
  activate :livereload
end

configure :build do
  activate :relative_assets
  set :relative_links, true
end
