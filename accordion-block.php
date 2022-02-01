<?php
/*
    Plugin Name: Accordion Block
*/

function my_register_gutenberg_accordion_block() {

    /**
     * Enqueue frontend and editor JavaScript and CSS
     */
    function accordion_block_plugin_styles() {

        // Enqueue front end and editor block style
        wp_enqueue_style(
            'my-block-css',
            plugins_url('/blocks/dist/main.build.css', __FILE__),
            [],
        );

        // Enqueue frontend block script
        wp_enqueue_script(
            'accordion-block-js',
            plugins_url('/blocks/src/block/js/front.js', __FILE__),
            array( 'jquery' )
        );

    }

    // Hook the enqueue function into the frontend and editor
    add_action( 'enqueue_block_assets', 'accordion_block_plugin_styles' );

    // Enqueue block script
    wp_register_script(
        'gutenberg-accordion-block',
        plugins_url('/blocks/dist/blocks.build.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor')
    );
    
    // Register Block
    register_block_type('accordion-block/main', array(
        'editor_script' => 'gutenberg-accordion-block'
    ));
  }
  
  add_action('init', 'my_register_gutenberg_accordion_block');