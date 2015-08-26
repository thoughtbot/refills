require "spec_helper"

describe Refills::ImportGenerator, type: :generator do
  SNIPPETS = {
    accordion: %w[scss js haml],
    accordion_tabs: %w[scss js haml],
    animate: %w[scss js haml],
    badges: %w[scss haml],
    breadcrumbs: %w[scss haml],
    button_group: %w[scss haml],
    cards: %w[scss haml],
    centered_navigation: %w[scss js haml],
    code: %w[haml],
    comment: %w[scss haml],
    device: %w[scss haml],
    dropdown: %w[scss js haml],
    footer: %w[scss haml],
    grid_items: %w[scss haml],
    grid_items_lines: %w[scss haml],
    hero: %w[scss haml],
    hover_tile_animation: %w[scss haml],
    icon_bullet_points: %w[scss haml],
    image_gradient_dynamic: %w[scss haml],
    modal: %w[scss js haml],
    navigation: %w[scss js haml],
    pagination: %w[scss haml],
    progress_bar: %w[scss haml],
    progress_bar_indication: %w[scss haml],
    search_bar: %w[scss haml],
    search_tools: %w[scss js haml],
    side_image: %w[scss haml],
    sliding_panel: %w[scss js haml],
    snippet: %w[haml],
    switch: %w[scss haml],
    tables: %w[scss haml],
    tables_minimal: %w[scss haml],
    "texture-legend" => %w[scss],
    textures: %w[scss haml],
    tooltip: %w[scss haml],
    type_system_geometric: %w[scss haml],
    type_system_rounded: %w[scss haml],
    type_system_sans: %w[scss haml],
    type_system_serif: %w[scss haml],
    type_system_slab: %w[scss haml],
    type_system_traditional: %w[scss haml],
    vertical_tabs: %w[scss js haml],
    video: %w[scss haml],
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

    if templates.include?("haml")
      it "imports haml template for #{snippet.humanize}" do
        run_generator [ snippet ]

        assert_file "app/views/refills/_#{snippet.underscore}.html.haml"
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
