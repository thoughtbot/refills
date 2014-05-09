module SnippetHelpers
  SOURCE_DIR = File.expand_path('../../source', __FILE__)

  SNIPPET_LANGUAGES = {
    javascript: { path_segments: [SOURCE_DIR, 'javascripts', 'refills'], extension: 'js' }
  }

  def snippets(snippet_name)
    partial 'snippets', locals: { snippet_name: snippet_name }
  end

  def html_snippet(snippet_name)
    snippet = partial(snippet_name)

    partial 'snippet', locals: { snippet: snippet, language: 'markup' }
  end

  def javascript_snippet(snippet_name)
    path = snippet_path(snippet_name, :javascript)

    if File.exists?(path)
      snippet = File.read(path)
      partial 'snippet', locals: { snippet: snippet, language: 'javascript' }
    end
  end

  def stylesheet_snippet(snippet_name)
    snippet_filename = "_#{snippet_name}.scss"
    snippet_path = File.join(SOURCE_DIR, 'stylesheets', 'refills', snippet_filename)
    snippet = File.read(snippet_path)

    partial 'snippet', locals: { snippet: snippet, language: 'scss' }
  end
  
  private

  def snippet_path(snippet_name, snippet_language)
    language_properties = SNIPPET_LANGUAGES.fetch(snippet_language)
    snippet_filename = "_#{snippet_name}.#{language_properties[:extension]}"

    File.join(*language_properties[:path_segments], snippet_filename)
  end
end
