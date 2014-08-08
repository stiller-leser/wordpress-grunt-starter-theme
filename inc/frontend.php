<?php
/**
 * This file contains important frontend functionality.
 *
 * @package mywptheme
 */

function mywptheme_enqueue_scripts()
{
  wp_enqueue_style( 'mywptheme', MYWPTHEME_THEME_URL . '/assets/dist/mywptheme.min.css', array(), MYWPTHEME_THEME_VERSION );
  if( file_exists( MYWPTHEME_THEME_PATH . '/assets/dev/fancybox/source/jquery.fancybox.pack.js' ) )
  {
    wp_enqueue_style( 'jquery-fancybox', MYWPTHEME_THEME_URL . '/assets/dev/fancybox/source/jquery.fancybox.css', array(), '2.1.5' );
    wp_enqueue_script( 'jquery-fancybox', MYWPTHEME_THEME_URL . '/assets/dev/fancybox/source/jquery.fancybox.pack.js', array( 'jquery' ), '2.1.5', true );
  }
  wp_enqueue_script( 'mywptheme', MYWPTHEME_THEME_URL . '/assets/dist/mywptheme.min.js', array( 'jquery' ), MYWPTHEME_THEME_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'mywptheme_enqueue_scripts' );

function mywptheme_wp_title( $sep )
{
  if( defined( 'WPSEO_VERSION' ) )
  {
    wp_title( '' );
  }
  else
  {
    wp_title( $sep, true, 'right' );
    if( !is_feed() )
    {
      global $page, $paged;

      bloginfo( 'name', 'display' );

      $site_description = get_bloginfo( 'description', 'display' );
      if( $site_description && ( is_home() || is_front_page() ) )
      {
        echo ' ' . $sep . ' ' . $site_description;
      }

      if( ( $paged >= 2 || $page >= 2 ) && ! is_404() )
      {
        echo ' ' . $sep . ' ' . sprintf( __( 'Page %s', 'mywptheme' ), max( $paged, $page ) );
      }
    }
  }
}
