configure :development do
  activate :livereload
end

configure :build do
  activate :minify_css
  activate :minify_javascript
end
