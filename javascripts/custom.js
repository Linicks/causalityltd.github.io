(function($) {

    var Novelty = {

        /**
         * Init Function
         */
        init: function() {
            Novelty.Preloader();
            Novelty.NiceScroll();
            // Novelty.FillFirstSection(); // Uncomment this function to automatically fill the first screen.
            Novelty.ChangeOpacity();
            Novelty.RetinaReady();
            Novelty.SmoothScroll();
            Novelty.LightGallery();
            Novelty.PricingTable();
            Novelty.BindToScroll();
            Novelty.TeamMembers();
            //Novelty.Tweets();
            Novelty.Portfolio();
            Novelty.GoogleMap();
            Novelty.MCNewsletter();
            Novelty.WowAnimation();
            Novelty.svgFallback();
            //Novelty.MainChart();
        },

        svgFallback: function() {
            if (!Modernizr.smil) {
                $("img[src$='.svg']")
                    .attr("src", "images/preloading.gif");
            }

        },

        Preloader: function() {
            $(window).load(function() {
                "use strict";
                $('.loading-gif').delay().fadeOut('slow');
                $('.preloading').delay().fadeOut('slow');
                $('body').delay(500);
            });
        },
        NiceScroll: function() {

            var doc = $(document),
                theHtml = $("html");
            theHtml.niceScroll();


        },
        ChangeOpacity: function() {
            var h = window.innerHeight;
            $(window).on('scroll', function() {
                var st = $(this).scrollTop();
                $('#top').css('opacity', (1 - st / h));



            });
        },

        FillFirstSection: function() {
            $(function() {
                $('#top').css({
                    'height': ($(window).height()) + 'px'
                });
                $(window).resize(function() {
                    $('#top').css({
                        'height': ($(window).height()) + 'px'
                    });
                });
            });

        },

        RetinaReady: function() {
            if (window.devicePixelRatio >= 1.2) {
                $("[data-2x]").each(function() {
                    if (this.tagName == "IMG") {
                        $(this).attr("src", $(this).attr("data-2x"));
                    } else {
                        $(this).css({
                            "background-image": "url(" + $(this).attr("data-2x") + ")"
                        });
                    }
                });
            }
        },
        SmoothScroll: function() {
            smoothScroll.init({
                speed: 800, // Integer. How fast to complete the scroll in milliseconds
                easing: 'easeInOutCubic', // Easing pattern to use
                updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
                offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
                callbackBefore: function(toggle, anchor) {}, // Function to run before scrolling
                callbackAfter: function(toggle, anchor) {

                        $('[data-scroll]').removeClass('active');
                        $(toggle).addClass('active');
                    } // Function to run after scrolling
            });
        },
        LightGallery: function() {
            $("#novelty-gallery").lightGallery({
                html: true,
                vimeoColor: '0483d9'
            });
            $("#novelty-portfolio").lightGallery({
                html: true
            });
        },
        PricingTable: function() {
            $('#yearly').on('click', function() {
                $('.pricing-table > .price-monthly').slideUp('fast').next().slideDown('fast');
                $(this).addClass('active').siblings().removeClass('active');
            });

            $('#monthly').on('click', function() {
                $('.pricing-table > .price-yearly').slideUp('fast').prev().slideDown('fast');
                $(this).addClass('active').siblings().removeClass('active');

            });
        },
        BindToScroll: function() {

            // Cache selectors
            var lastId,
                topMenu = $(".navbar-nav"),
                topMenuHeight = topMenu.outerHeight() + 50,
                // All list items
                menuItems = topMenu.find("a"),
                // Anchors corresponding to menu items
                scrollItems = menuItems.map(function() {
                    var item = $($(this).attr("href"));
                    if (item.length) {
                        return item;
                    }
                });
            // Bind to scroll
            $(window).scroll(function() {
                var h = window.innerHeight;
                var st = $(this).scrollTop();
                $('#top').css('opacity', (1 - st / h));

                // Get container scroll position
                var fromTop = $(this).scrollTop() + topMenuHeight;

                // Get id of current scroll item
                var cur = scrollItems.map(function() {
                    if ($(this).offset().top < fromTop)
                        return this;
                });
                // Get the id of the current element
                cur = cur[cur.length - 1];
                var id = cur && cur.length ? cur[0].id : "";

                if (lastId !== id) {
                    lastId = id;
                    // Set/remove active class
                    menuItems
                        .removeClass("active")
                        .filter("[href=#" + id + "]").addClass("active");
                }

                var item = $('#back-to-top');
                if ($(this).scrollTop() > ($(this).height() / 3)) {
                    item.fadeIn('slow');
                } else {
                    item.fadeOut('slow');
                }

            });
        },
        TeamMembers: function() {
            $('.more-team-members li').on('mouseenter', function() {
                $(this).children().next().hide().next().show();

            });

            $('.more-team-members li').on('mouseleave', function() {
                $(this).children().next().show().next().hide();

            });
        },
        Tweets: function() {
            $('.tweets').each(function() {
                var tweets = $(this),
                    data = tweets.data() || {};
                tweets.tweet({
                    modpath: 'javascripts/twitter/',
                    username: data.username,
                    count: data.count,
                    template: "{text}{time}",
                    loading_text: 'loading twitter feed...'
                });
            });
        },
        Portfolio: function() {

            var $container = $('#makePortfolio').imagesLoaded(function() {

                // init
                $container.isotope({
                    // options
                    itemSelector: '.portfolio-item',
                    transitionDuration: '0.8s'
                });


            });
            $('#filters').on('click', 'button', function() {
                var filterValue = $(this).attr('data-filter');
                $container.isotope({
                    filter: filterValue
                });

            });
            $('.controls').each(function(i, buttonGroup) {
                var $buttonGroup = $(buttonGroup);
                $buttonGroup.on('click', 'button', function() {
                    $buttonGroup.find('.active').removeClass('active');
                    $(this).addClass('active');
                });
            });
        },
        GoogleMap: function() {

            // The latitude and longitude of your business / place
            var position = [51.498753, -0.179152];

            function showGoogleMap() {

                var latLng = new google.maps.LatLng(position[0], position[1]);

                var mapOptions = {
                    zoom: 16, // initialize zoom level - the max value is 21
                    streetViewControl: false, // hide the yellow Street View pegman
                    scaleControl: false, // allow users to zoom the Google Map
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    center: latLng,
                    scrollwheel: false,
                    disableDefaultUI: true
                };

                map = new google.maps.Map(document.getElementById('googlemap'),
                    mapOptions);

                // Show the default red marker at the location
                marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    draggable: false,
                    animation: google.maps.Animation.DROP
                });
            }

            google.maps.event.addDomListener(window, 'load', showGoogleMap);
            google.maps.event.addDomListener(window, 'resize', showGoogleMap);

            $('#map-switch').on('click', function() {

                if ($('#googlemap').hasClass('active')) {
                    $('#googlemap').css('z-index', '').removeClass('active animated bounceIn').css('opacity', '0.4');
                    $(this).css('z-index', '');
                    $('#map-switch button').html('Show Map');

                } else {
                    $('#googlemap').css('z-index', '999').addClass('active animated bounceIn').css('opacity', '1');
                    $(this).css('z-index', '1000');
                    $('#map-switch button').html('Hide Map');


                }
            });
        },
        MCNewsletter: function() {

            $('#mc-form').ajaxChimp({
                //url to replace with your mailchimp list url

                url: 'http://uexel.us2.list-manage.com/subscribe/post?u=4c02525eb4121775580c878fd&amp;id=0939a9b373'
            });
        },
        WowAnimation: function() {

            var wow = new WOW({
                boxClass: 'wow', // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset: 0, // distance to the element when triggering the animation (default is 0)
                mobile: false // trigger animations on mobile devices (true is default)
            });
            wow.init();

        },
        MainChart: function() {
            nv.addGraph(function() {

              var superscript = "⁰¹²³⁴⁵⁶⁷⁸⁹",
                  formatPower = function(d) { return (d + "").split("").map(function(c) { return superscript[c]; }).join(""); };
              
              var chart = nv.models.lineChart()
                .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)       //Show the x-axis
                .yScale(d3.scale.log().domain([Math.exp(0), Math.exp(11)]));
                
              chart.xAxis     //Chart x-axis settings
                  .axisLabel('Year of Introduction');
                  
              chart.yAxis     //Chart y-axis settings
                  .axisLabel('Hardware Performance')
                  .tickFormat(function(d) { return "e" + formatPower(Math.round(Math.log(d))); });

              var myData = [
                  {
                    "values": [
                      {"x": 1970, "y": 2300},
                      {"x": 1975, "y": 9200},
                      {"x": 1980, "y": 73600},
                      {"x": 1985, "y": 294400},
                      {"x": 1990, "y": 2355200},
                      {"x": 1995, "y": 9420800},
                      {"x": 2000, "y": 75366400},
                      {"x": 2005, "y": 391465699},
                      {"x": 2010, "y": 2411724800},
                      {"x": 2015, "y": 9646899200}
                    ],
                    "key": "Transistor count",
                    "color": "#A6E22E"
                  },
                  {
                    "values": [
                      {"x": 1970, "y": 0.108},
                      {"x": 1975, "y": 2},
                      {"x": 1980, "y": 9.3},
                      {"x": 1985, "y": 16},
                      {"x": 1990, "y": 36.5},
                      {"x": 1995, "y": 259},
                      {"x": 2000, "y": 1099},
                      {"x": 2005, "y": 2771},
                      {"x": 2010, "y": 2345},
                      {"x": 2015, "y": 2485}
                    ],
                    "key": "Clock speed",
                    "color": "#F92672"
                  }];

              d3.select('#top svg')    //Select the <svg> element you want to render the chart in.   
                .datum(myData)         //Populate the <svg> element with chart data...
                .call(chart);          //Finally, render the chart!

              //Update the chart when window resizes.
              nv.utils.windowResize(function() { chart.update() });
              return chart;
            });
        }
    };


    $(function() {
        Novelty.init();
    });
})(jQuery);
