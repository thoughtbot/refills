activate :autoprefixer
activate :directory_indexes
activate :sprockets

set :css_dir, "stylesheets"
set :images_dir, "images"
set :js_dir, "javascripts"

configure :development do
  activate :livereload
end

configure :build do
  activate :relative_assets
  set :relative_links, true
end
