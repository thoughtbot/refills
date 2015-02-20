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

  class ScssVariableSnippet < ScssSnippet
    def path_segments
      [SOURCE_DIR, "stylesheets", "_#{name}.scss"]
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

  class CoffeeScriptSnippet < Snippet
    def path_segments
      [
        SOURCE_DIR,
        "javascripts",
        "refills",
        "coffeescript",
        "#{name.underscore}.coffee"
      ]
    end

    def language
      :javascript
    end
  end

  def code_for(snippet_name, variable_name = "refills-variables")
    partial "code", locals: {
      snippets: snippets_for(snippet_name),
      variables: variable_for(variable_name),
    }
  end

  private

  def snippets_for(name)
    [
      HtmlSnippet,
      ScssSnippet,
      JavaScriptSnippet,
      CoffeeScriptSnippet,
    ].map do |snippet_factory|
      render_snippet snippet_factory.new(name)
    end.join("\n")
  end

  def variable_for(variable_name)
    render_snippet ScssVariableSnippet.new(variable_name)
  end

  def render_snippet(snippet)
    if File.exists?(snippet.path)
      partial 'snippet', locals: {
        snippet: File.read(snippet.path),
        language: snippet.language
      }
    end
  end
end
