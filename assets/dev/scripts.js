+function ($) {
  'use strict';

  var theme_config = {
    load_fancybox: true,
    load_tooltips: false,
    load_popovers: false,
    wrap_embeds: true
  };

  $(document).ready(function($) {

    if(theme_config.load_fancybox && $.fn.fancybox) {
      var fancybox_args = {
        maxWidth: 1280,
        maxHeight: 720,
        width: '90%',
        height: '90%',
        openEffect: 'elastic',
        closeEffect: 'elastic',
        nextEffect: 'elastic',
        prevEffect: 'elastic'
      };
      $('a[href$=".jpg"],a[href$=".jpeg"],a[href$=".png"],a[href$=".gif"]').each(function() {
        var $this = $(this);
        var $wrap = $this.parents('.gallery');
        if($wrap.length !== 0) {
          $this.attr('rel', $wrap.attr('id')).fancybox(fancybox_args);
        }
        else {
          $this.fancybox(fancybox_args);
        }
      });
    }

    if(theme_config.load_tooltips && $.fn.tooltip) {
      $('[rel="tooltip"]').tooltip();
    }

    if(theme_config.load_popovers && $.fn.popover) {
      $('[rel="popover"]').popover();
    }

    if(theme_config.wrap_embeds) {
      $('iframe, embed, object').each(function() {
        var $this = $(this);
        if($this.parents('.embed-responsive').length === 0) {
          $this.wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
        }
      });
    }

  });

}(jQuery);
