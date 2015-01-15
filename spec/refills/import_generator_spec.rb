require "spec_helper"

describe Refills::ImportGenerator, type: :generator do
  SNIPPETS = {
    accordion: %w[scss js erb],
    accordion_tabs: %w[scss js erb],
    animate: %w[scss js erb],
    badges: %w[scss erb],
    breadcrumbs: %w[scss erb],
    button_group: %w[scss erb],
    cards: %w[scss erb],
    centered_navigation: %w[scss js erb],
    code: %w[erb],
    comment: %w[scss erb],
    device: %w[scss erb],
    dropdown: %w[scss js erb],
    footer: %w[scss erb],
    grid_items: %w[scss erb],
    grid_items_lines: %w[scss erb],
    hero: %w[scss erb],
    hover_tile_animation: %w[scss erb],
    icon_bullet_points: %w[scss erb],
    image_gradient_dynamic: %w[scss erb],
    modal: %w[scss js erb],
    navigation: %w[scss js erb],
    pagination: %w[scss erb],
    progress_bar: %w[scss erb],
    progress_bar_indication: %w[scss erb],
    search_bar: %w[scss erb],
    search_tools: %w[scss js erb],
    side_image: %w[scss erb],
    sliding_menu: %w[scss js erb],
    snippet: %w[erb],
    switch: %w[scss erb],
    tables: %w[scss erb],
    tables_minimal: %w[scss erb],
    "texture-legend" => %w[scss],
    textures: %w[scss erb],
    tooltip: %w[scss erb],
    type_system_geometric: %w[scss erb],
    type_system_rounded: %w[scss erb],
    type_system_sans: %w[scss erb],
    type_system_serif: %w[scss erb],
    type_system_slab: %w[scss erb],
    type_system_traditional: %w[scss erb],
    vertical_tabs: %w[scss js erb],
    video: %w[scss erb],
  }

  destination File.expand_path("../../tmp", File.dirname(__FILE__))

  before do
    ensure_previous_snippets_removed
  end

  SNIPPETS.each do |snippet, templates|
    snippet   = snippet.to_s

    if templates.include?("scss")
      it "imports SCSS file for #{snippet.humanize}" do
        run_generator [ snippet ]

        assert_file "app/assets/stylesheets/refills/_#{snippet.dasherize}.scss"
      end
    end

    if templates.include?("erb")
      it "imports ERB template for #{snippet.humanize}" do
        run_generator [ snippet ]

        assert_file "app/views/refills/_#{snippet.underscore}.html.erb"
      end
    end

    if templates.include?("js")
      it "imports JS file for #{snippet.humanize}" do
        run_generator [snippet]

        assert_file(
          "app/assets/javascripts/refills/#{snippet.underscore}.js"
        )
        assert_no_file(
          "app/assets/javascripts/refills/#{snippet.underscore}.coffee"
        )
      end

      context "with --coffee" do
        it "imports Coffee file for #{snippet.humanize}" do
          run_generator [snippet, "--coffee"]

          assert_file(
            "app/assets/javascripts/refills/#{snippet.underscore}.coffee"
          )
          assert_no_file(
            "app/assets/javascripts/refills/#{snippet.underscore}.js"
          )
        end
      end
    end

  end

  def ensure_previous_snippets_removed
    prepare_destination
  end
end
