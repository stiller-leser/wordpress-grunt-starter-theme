<?php
/**
 * Flexible Google Analytics embeds with filterable pushes.
 *
 * Supports both the universal and the classic tracking code.
 *
 * @package mywptheme
 */

class MyWPTheme_Google_Analytics
{
  private static $instance = null;

  private $account = '';
  private $domain = '';
  
  private $mode = 'universal';
  
  public static function instance()
  {
    if( self::$instance == null )
    {
      self::$instance = new self;
    }
    return self::$instance;
  }
  
  private function __construct()
  {
    if( defined( 'MYWPTHEME_GA_ACCOUNT' ) )
    {
      $this->account = MYWPTHEME_GA_ACCOUNT;
    }
    
    if( !empty( $this->account ) )
    {
      $this->domain = str_replace( 'https://', '', str_replace( 'http://', '', home_url() ) );
      if( defined( 'MYWPTHEME_GA_MODE' ) && MYWPTHEME_GA_MODE == 'classic' )
      {
        $this->mode = MYWPTHEME_GA_MODE;
      }
      add_action( 'wp_footer', array( $this, 'append' ) );
    }
  }
  
  public function append()
  {
    if( $this->mode == 'classic' )
    {
      $src = $this->get_classic_tracking_code();
    }
    else
    {
      $src = $this->get_universal_tracking_code();
    }

    echo '<script type="text/javascript">' . $src . '</script>';
  }
  
  private function get_classic_tracking_code()
  { 
    $code = 'var _gaq = _gaq || [];
_gaq.push(';

    $pushes = $this->get_pushes();
      $first = true;
    foreach( $pushes as $push )
    {
      if( is_array( $push ) )
      {
        if( !$first )
        {
          $code .= ',';
        }
        else
        {
          $first = false;
        }
        $push = array_map( array( $this, 'wrap_with_single_quotes' ), $push );
        $code .= '[' . implode( ', ', $push ) . ']';
      }
    }
    
    $code .= ');
(function() {
  var ga = document.createElement(\'script\');
  ga.type = \'text/javascript\';
  ga.async = true;
  ga.src = (\'https:\' == document.location.protocol ? \'https://ssl\' : \'http://www\') + \'.google-analytics.com/ga.js\';
  var s = document.getElementsByTagName(\'script\')[0];
  s.parentNode.insertBefore(ga, s);
})();';
    
    return $code;
  }
  
  private function get_universal_tracking_code()
  {
    $code = '(function(i,s,o,g,r,a,m) {
  i[\'GoogleAnalyticsObject\'] = r;
  i[r] = i[r] || function() {(i[r].q = i[r].q || []).push(arguments)}, i[r].l = 1 * new Date();
  a = s.createElement(o), m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a,m)
})(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');';

    $pushes = $this->get_pushes();
    foreach( $pushes as $push )
    {
      if( is_array( $push ) )
      {
        $push = array_map( array( $this, 'wrap_with_single_quotes' ), $push );
        $code .= 'ga(' . implode( ', ', $push ) . ');';
      }
    }
    
    return $code;
  }

  public function get_pushes()
  {
    $pushes = array();
    if( $this->mode == 'classic' )
    {
      $pushes[] = array(
        '_setAccount',
        $this->account,
      );
      if( !empty( $this->domain ) )
      {
        $pushes[] = array(
          '_setDomainName',
          $this->domain,
        );
      }
    }
    else
    {
      $pushes[] = array(
        'create',
        $this->account,
      );
      if( !empty( $this->domain ) )
      {
        $pushes[0][] = $this->domain;
      }
    }

    $pushes = apply_filters( 'mywptheme_ga_pushes_before_send', $pushes, $this->mode );

    if( $this->mode == 'classic' )
    {
      $pushes[] = array(
        '_trackPageview',
      );
    }
    else
    {
      $pushes[] = array(
        'send',
        'pageview',
      );
    }
    $pushes = apply_filters( 'mywptheme_ga_pushes_after_send', $pushes, $this->mode );
    return $pushes;
  }
  
  public function wrap_with_single_quotes( $item )
  {
    return '\'' . $item . '\'';
  }
}
MyWPTheme_Google_Analytics::instance();
