<?php
/**
 * functions.php for loading all theme-specific functionality
 *
 * @package mywptheme
 */

define( 'MYWPTHEME_THEME_VERSION', '1.0.0' );
define( 'MYWPTHEME_THEME_PATH', get_template_directory() );
define( 'MYWPTHEME_THEME_URL', get_template_directory_uri() );

function mywptheme_is_element_empty( $element )
{
  $element = trim( $element );
  return empty( $element ) ? false : true;
}

require_once MYWPTHEME_THEME_PATH . '/inc/constants.php';
require_once MYWPTHEME_THEME_PATH . '/inc/theme-setup.php';
if( is_admin() )
{
  require_once MYWPTHEME_THEME_PATH . '/inc/backend.php';
}
else
{
  require_once MYWPTHEME_THEME_PATH . '/inc/frontend.php';
}

// components
if( MYWPTHEME_ENABLE_BOOTSTRAP_NAVIGATION )
{
  require_once MYWPTHEME_THEME_PATH . '/inc/components/bootstrap-navigation.php';
}
if( MYWPTHEME_ENABLE_GOOGLE_ANALYTICS )
{
  require_once MYWPTHEME_THEME_PATH . '/inc/components/google-analytics.php';
}
