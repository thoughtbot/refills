configure :development do
  activate :livereload
end

configure :build do
  activate :minify_css
  activate :minify_javascript
end

helpers do
  require "nokogiri"
  def inline_svg(name, options = {})
    root = Middleman::Application.root
    file_path = "#{root}/source/images/#{name}.svg"

    if File.exists?(file_path)
      file = File.read(file_path)
      doc = Nokogiri::HTML::DocumentFragment.parse file
      svg = doc.at_css "svg"
      if options[:class].present?
        svg["class"] = options[:class]
      end
      svg
    else
      "Not found"
    end
  end
end
