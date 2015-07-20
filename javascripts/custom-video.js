(function($) {

    var NoveltyWithVideo = {
        init: function() {
            NoveltyWithVideo.Check();
        },

        Check: function() {

            var deviceAgent = navigator.userAgent.toLowerCase();
            $iOS = deviceAgent.match(/(iphone|ipod|ipad)/);
            var ua = navigator.userAgent.toLowerCase();
            var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

            if ($iOS || isAndroid) {

                $('.video-container').css({
                    'display': 'none'
                });
                $('.video-fallback').css({
                    'display': 'block'
                });
            } else {
                // you can do anything else, because videos is not fully supported in android and ios devices
            }


        }
    };


    $(function() {
        NoveltyWithVideo.init();
    });
})(jQuery);
