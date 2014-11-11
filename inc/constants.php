<?php
/**
 * The following constants may be defined in your wp-config.php to override the defaults from here.
 *
 * These constants define which parts of the theme are loaded.
 * If you don't use some of the following parts, it is a good choice to disable them to increase site speed.
 *
 * @package mywptheme
 */

if( !defined( 'MYWPTHEME_ENABLE_BOOTSTRAP_GALLERY' ) )
{
  define( 'MYWPTHEME_ENABLE_BOOTSTRAP_GALLERY', true );
}
if( !defined( 'MYWPTHEME_ENABLE_BOOTSTRAP_NAVIGATION' ) )
{
  define( 'MYWPTHEME_ENABLE_BOOTSTRAP_NAVIGATION', true );
}
if( !defined( 'MYWPTHEME_ENABLE_GOOGLE_ANALYTICS' ) )
{
  define( 'MYWPTHEME_ENABLE_GOOGLE_ANALYTICS', true );
}