<?php
/**
 * The main template file.
 *
 * @package mywptheme
 */

get_header(); ?>

  <div class="container">
    <div class="row">

      <main class="primary col-md-<?php echo ( is_active_sidebar( 'primary' ) ? 9 : 12 ); ?>" role="main">
      
      </main>

      <?php if( is_active_sidebar( 'primary' ) ) : ?>
      <aside class="secondary col-md-3" role="complementary">
        <?php get_sidebar(); ?>
      </aside>
      <?php endif; ?>

    </div>
  </div>

<?php get_footer(); ?>
