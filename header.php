<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <section id="content">
 *
 * @package mywptheme
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php mywptheme_wp_title( '|' ); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

  <header role="banner">
    
    <?php if( has_nav_menu( 'primary' ) ) : ?>
    <nav role="navigation">
      <?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>
    </nav>
    <?php endif; ?>

  </header>

  <section id="content">
