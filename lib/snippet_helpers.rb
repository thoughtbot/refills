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

  def code_for(snippet_name)
    partial 'code', locals: { snippet_name: snippet_name }
  end

  def snippets_for(name)
    SNIPPET_LANGUAGES.keys.map do |language|
      path = snippet_path(name, language)

      if File.exists?(path)
        partial 'snippet', locals: {
          snippet: File.read(path),
          language: language,
        }
      end
    end.join("\n")
  end

  private

  def snippet_path(snippet_name, snippet_language)
    language_properties = SNIPPET_LANGUAGES.fetch(snippet_language)
    snippet_filename = "_#{snippet_name}.#{language_properties[:extension]}"

    File.join(*language_properties[:path_segments], snippet_filename)
  end
end
