    </div><!-- /.inner -->
  </section><!-- /section -->

</div><!-- /wrapper -->

<footer role="contentinfo">
  <div class="inner">

    <p class="copyright">
      &copy; <?php echo date("Y"); ?> Собственность <?php bloginfo('name'); ?>.
    </p><!-- /copyright -->

  </div><!-- /.inner -->
</footer><!-- /footer -->

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
