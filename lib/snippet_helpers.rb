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
    partial 'code', locals: { snippets: snippets_for(snippet_name) }
  end

  private

  def snippets_for(name)
    SNIPPET_LANGUAGES.map do |language, properties|
      snippet snippet_path(name, properties), language
    end.join("\n")
  end

  def snippet(path, language)
    if File.exists?(path)
      partial 'snippet', locals: {
        snippet: File.read(path),
        language: language,
      }
    end
  end

  def snippet_path(snippet_name, language_properties)
    snippet_filename = "_#{snippet_name}.#{language_properties[:extension]}"

    File.join(*language_properties[:path_segments], snippet_filename)
  end
end
