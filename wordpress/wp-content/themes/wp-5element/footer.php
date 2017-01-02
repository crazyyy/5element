    </div>
    <div style="clear:both; border-top: 1px #71cacf solid;">
      <div class="sertificate_block" style="margin:10px auto; width:980px; margin-bottom:100px;">
        <div style="width:650px;float:left">
          <div class="title">Сертификаты</div>
          <p>При монтаже натяжных потолков используется безопасное оборудование.</p>
          <br>
          <div class="photo">
            <div class="ngg-galleryoverview" id="ngg-gallery-9-95">
              <?php if( have_rows('sertificats', 30) ): while ( have_rows('sertificats', 30) ) : the_row(); ?>
                <?php $image = get_sub_field('image'); if( !empty($image) ): ?>
                  <div class="ngg-gallery-thumbnail-box">
                    <div class="ngg-gallery-thumbnail">
                      <a href="<?php echo $image['url']; ?>" title=" " rel="lightbox">
                        <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" width="100" />
                      </a>
                    </div>
                  </div>
                <?php endif; ?>
              <?php endwhile; endif; ?>
            </div><!-- ngg-galleryoverview -->
          </div><!-- photo -->
        </div>
        <div>
          <h2>Покупателю</h2>
          <div class="menu-menu_bottom-container">
            <?php wpeFootNav(); ?>
          </div>
          <br><span style="color:#a9aaaa; font-size:15px;">МНОГОКАНАЛЬНЫЙ</span>
          <br><span style="font-size: 32px; color: #de2c2c;"> 643-43-33</span></div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
  <!-- End Main block -->
  <!-- Footer block -->
  <footer>
    <div class="clearfix" style="margin: 0 auto; width: 980px;">

      <div style="float:left; font-size: 12px; padding-top: 85px; width: 300px; "> © 2008 Натяжные потолки в Санкт-Петербурге
        <br> +7(812)643-43-33
      </div>
      <div style="width: 325px; float:right;">
        <img src="<?php echo get_template_directory_uri(); ?>/img/logo_new.jpg" style="float:left; padding-top:80px;">&nbsp;
        <p style="font-size: 12px; padding-top: 85px;"><?php bloginfo('name'); ?></p>
      </div>

    </div>
  </footer>
  <?php wp_footer(); ?>
  <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/jquery.js"></script>
  <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/jquery-migrate.min.js"></script>
  <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/jquery.cycle.all.min.js"></script>
  <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/ngg.slideshow.min.js"></script>
  <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/vslider.js"></script>
  <script charset="utf8" async="" src="<?php echo get_template_directory_uri(); ?>/js/main.js"></script>
  <!-- Start vSlider options -->
  <script type="text/javascript">
  var $jq = jQuery.noConflict();
  $jq(document).ready(function() {
    $jq('#main').coinslider({
      width: 718,
      height: 280,
      spw: 7,
      sph: 5,
      delay: 4000,
      sDelay: 30,
      opacity: 0.7,
      titleSpeed: 1500,
      effect: '',
      navigation: true,
      links: true,
      stickynav: false,
      hoverPause: true
    });
  });
  </script>
  <!-- Begin vSlider options -->
  <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/jquery.form.min.js"></script>
  <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/navigation.js"></script>

</body>
</html>
