require 'erubis'
###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# activate :livereload

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

activate :directory_indexes

# set :build_dir, "tmp"

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

helpers do
  def snippets(snippet_name)
    partial 'snippets', locals: { snippet_name: snippet_name }
  end

  def html_snippet(partial_name)
    snippet = partial(partial_name)

    partial 'snippet', locals: { snippet: snippet, language: 'markup' }
  end

  def stylesheet_snippet(snippet_name)
    source_dir = File.expand_path('../source', __FILE__)
    snippet_filename = "_#{snippet_name}.scss"
    snippet_path = File.join(source_dir, 'stylesheets', 'refills', snippet_filename)
    snippet = File.read(snippet_path)

    partial 'snippet', locals: { snippet: snippet, language: 'scss' }
  end
end

ready do
  sprockets.append_path 'vendor/stylesheets'
  sprockets.append_path 'vendor/javascripts'
end

# Build-specific configuration
configure :build do

  activate :relative_assets
  set :relative_links, true
  
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
