<aside class="sidebar_l">

  <div class="menu_left_block">
    <div class="menu_left menu" id="menu-menu_main">
      <div class="menu-menu_main-container">
        <?php wpeSideNav(); ?>
      </div>
    </div>
  </div><!-- menu_left_block -->

  <a class="potolki-svoimi-rukami my_btn" href="#">Натяжной потолок своими руками <br><img src="<?php echo get_template_directory_uri(); ?>/img/bezgaza.png" width="185" height="60"></a>
  <a class="dizajn-potolkov my_btn" href="#">On-line визуализации в интерьере</a>
  <a href="#"><img src="<?php echo get_template_directory_uri(); ?>/img/rassrochka_51.png"></a>
  <img src="<?php echo get_template_directory_uri(); ?>/img/cards1.png">

  <div class="menu_left2">
    <h2>Каталог потолков:</h2>
    <div class="menu-menu_dop-container">
      <?php wpeSideNavTwo(); ?>
    </div>

    <?php if ( is_active_sidebar('widgetarea1') ) : ?>
      <?php dynamic_sidebar( 'widgetarea1' ); ?>
    <?php else : ?>
    <?php endif; ?>

  </div><!-- menu_left2 -->

</aside><!-- sidebar_l -->

