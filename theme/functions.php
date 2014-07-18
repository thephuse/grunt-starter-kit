<?php
/*
 * @package WordPress
 * @subpackage Theme
 */
  
  class Theme_functions {

    function __construct()
    {
      $this->_add_actions();
    }

    private function _actions()
    {
      add_action('wp_enqueue_scripts', array($this, '_enqueue_stylesheets'));
      add_action('wp_enqueue_scripts', array($this, '_enqueue_javascripts'));
    }
    
    function _enqueue_stylesheets()
    {

      wp_enqueue_style(
        'theme',
        get_template_directory_uri() . '/style.css'
      );

      wp_enqueue_style(
        'app',
        get_template_directory_uri() . '/dist/css/app.css'
      );

    }

    function _enqueue_javascripts()
    {

      if(WP_DEBUG === true)
      {
        wp_enqueue_script(
          'app',
          get_template_directory_uri() . '/dist/js/app.js',
          null,
          null,
          true
        );

        wp_enqueue_script(
          'livereload',
          '//localhost:9089/livereload.js',
          'app',
          null,
          true
        );

      }
      else
      {
        wp_enqueue_script(
          'app',
          get_template_directory_uri() . '/dist/js/app.min.js',
          null,
          null,
          true
        );
      }
    
    }
    
  }
  
  $theme = new Theme_functions;
  
?>