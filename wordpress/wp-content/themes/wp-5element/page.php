<?php get_header(); ?>

  <?php if (have_posts()): while (have_posts()) : the_post(); ?>

    <h1 class="entry-title"><?php the_title(); ?></h1>
    <div id="post-<?php the_ID(); ?>" <?php post_class('cont'); ?>>
      <?php the_content(); ?>
      <?php edit_post_link(); ?>
    </div>

  <?php endwhile; else: // If 404 page error ?>
    <div class="cont">
      <h2 class="page-title inner-title"><?php _e( 'Sorry, nothing to display.', 'wpeasy' ); ?></h2>
    </div>
  <?php endif; ?>

</section>
<?php get_sidebar(); ?>
<?php get_footer(); ?>
