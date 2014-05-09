module SnippetHelpers
  SOURCE_DIR = File.expand_path('../../source', __FILE__)

  SNIPPET_LANGUAGES = {
    javascript: {
      path_segments: [SOURCE_DIR, 'javascripts', 'refills'],
      extension: 'js',
    },
    scss: {
      path_segments: [SOURCE_DIR, 'stylesheets', 'refills'],
      extension: 'scss',
    },
    markup: {
      path_segments: [SOURCE_DIR],
      extension: 'html.erb',
    },
  }

  def snippets(snippet_name)
    partial 'snippets', locals: { snippet_name: snippet_name }
  end

  def snippet(name, language)
    path = snippet_path(name, language)

    if File.exists?(path)
      partial 'snippet', locals: {
        snippet: File.read(path),
        language: language,
      }
    end
  end

  private

  def snippet_path(snippet_name, snippet_language)
    language_properties = SNIPPET_LANGUAGES.fetch(snippet_language)
    snippet_filename = "_#{snippet_name}.#{language_properties[:extension]}"

    File.join(*language_properties[:path_segments], snippet_filename)
  end
end
