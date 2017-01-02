<?php if (have_posts()): while (have_posts()) : the_post(); ?>

  <li id="post-<?php the_ID(); ?>" <?php post_class('looper'); ?>>
    <div class="post">
      <h2 class="link_title"><a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a></h2>
      <a rel="nofollow" class="feature-img" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
        <?php if ( has_post_thumbnail()) :
          the_post_thumbnail('medium');
        else: ?>
          <img src="<?php echo catchFirstImage(); ?>" title="<?php the_title(); ?>" alt="<?php the_title(); ?>" />
        <?php endif; ?>
      </a><!-- /post thumbnail -->
      <?php wpeExcerpt('wpeExcerpt40'); ?>
      <div class="more">
        <noindex><a class="price" rel="nofollow" href="<?php the_permalink(); ?>">Подробнее</a></noindex>
      </div>
    </div>
  </li>

<?php endwhile; endif; ?>

