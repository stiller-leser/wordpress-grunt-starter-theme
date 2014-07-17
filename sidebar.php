<?php
/**
 * The sidebar for our theme.
 *
 * @package mywptheme
 */

if( !is_active_sidebar( 'primary' ) )
{
  return;
}
?>

<div id="secondary" class="widget-area" role="complementary">
  <?php dynamic_sidebar( 'primary' ); ?>
</div><!-- #secondary -->
