module SnippetHelpers
  SOURCE_DIR = File.expand_path('../../source', __FILE__)

  class Snippet
    def initialize(name)
      @name = name
    end

    def path
      File.join(*path_segments)
    end

    private

    attr_reader :name
  end

  class HtmlSnippet < Snippet
    def path_segments
      [SOURCE_DIR, "_#{name.underscore}.html.erb"]
    end

    def language
      :markup
    end
  end

  class ScssSnippet < Snippet
    def path_segments
      [SOURCE_DIR, 'stylesheets', 'refills', "_#{name.dasherize}.scss"]
    end

    def language
      :scss
    end
  end

  class JavaScriptSnippet < Snippet
    def path_segments
      [SOURCE_DIR, 'javascripts', 'refills', "#{name.underscore}.js"]
    end

    def language
      :javascript
    end
  end

  def code_for(snippet_name)
    partial 'code', locals: { snippets: snippets_for(snippet_name) }
  end

  private

  def snippets_for(name)
    [HtmlSnippet, ScssSnippet, JavaScriptSnippet].map do |snippet_factory|
      snippet = snippet_factory.new(name)
      render_snippet snippet.path, snippet.language
    end.join("\n")
  end

  def render_snippet(path, language)
    if File.exists?(path)
      partial 'snippet', locals: {
        snippet: File.read(path),
        language: language,
      }
    end
  end
end
