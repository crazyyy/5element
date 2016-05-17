<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=1080">

  <title><?php wp_title( '' ); ?><?php if ( wp_title( '', false ) ) { echo ' :'; } ?> <?php bloginfo( 'name' ); ?></title>
  <link href="http://www.google-analytics.com/" rel="dns-prefetch"><!-- dns prefetch -->
  <!-- icons -->
  <link href="<?php echo get_template_directory_uri(); ?>/favicon.ico" rel="shortcut icon">

  <!--[if lt IE 9]>
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/html5shiv.js"></script>
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/selectivizr.js"></script>
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/respond.js"></script>
  <![endif]-->
  <!-- css + javascript -->
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>


  <!-- Main block -->
  <div style="width: 1000px; margin: 0 auto; background-color: #fff;">
    <div class="page">
      <!-- Header block -->
      <header>
        <div class="header">
          <div class="logo_top">
            <a href="<?php echo home_url(); ?>"><img src="<?php echo get_template_directory_uri(); ?>/img/logo.png" alt="<?php wp_title( '' ); ?>" title="<?php wp_title( '' ); ?>" class="logo-img"></a>
          </div>

          <div class="tel_block"><span style="color:#de2c2c; font-size:15px;">МНОГОКАНАЛЬНЫЙ</span>
            <br><span class="tel"><span> 643-43-33</span>
            <div class="menu-menu_client-container">
              <ul id="menu-menu_client" class="menu_client">
                <li><a href="">Заказать звонок</a></li>
                <li><a href="">Вызвать замерщика</a></li>

              </ul>
            </div>
            </span>
          </div>
          <div class="vybor">
            <div class="vybor_left"><span><a href="#">НАТЯЖНЫЕ ПОТОЛКИ</a></span></div>
            <div class="vybor_right"><a href="#">ПЛАСТИКОВЫЕ ОКНА</a></div>
          </div>
          <div class="menu_top">
            <ul class="menu">
              <div class="menu-menu_top-container">
                <?php wpeHeadNav(); ?>
              </div>
            </ul>
          </div>
        </div>
      </header>
      <!-- END Header block -->
      <div class="main">
        <section class="center_content">
          <div style="margin-top:-10px; margin-left:-10px">
            <!-- End vSlider options -->
            <div id="maincontainer">
              <div class="coin-slider" id="coin-slider-main">
                <div id="main">
                  <a href="http://5element-potolki.ru/calc/" style="background:#fff;" target="">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/timthumb.jpg" style="width: 718px; height: 280px; display: none;" alt="">
                  </a>
                  <a href="http://5element-potolki.ru/" style="background:#fff;" target="">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/timthumb(1).jpg" style="width: 718px; height: 280px; display: none;" alt="">
                  </a>
                  <a href="http://5element-potolki.ru/" style="background:#fff;" target="">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/timthumb(2).jpg" style="width: 718px; height: 280px; display: none;" alt="">
                  </a>
                  <a href="http://5element-potolki.ru/" style="background:#fff;" target="">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/timthumb(3).jpg" style="width: 718px; height: 280px; display: none;" alt="">
                  </a>
                  <a href="http://5element-potolki.ru/" style="background:#fff;" target="">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/timthumb(4).jpg" style="width: 718px; height: 280px; display: none;" alt="">
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div style="clear:both"></div>
















