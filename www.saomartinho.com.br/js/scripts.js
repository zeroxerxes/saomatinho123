// PROJETO

$(document).ready(function () {

    // Fix input element click problem
    $('.dropdown input, .dropdown label').click(function (e) {
        e.stopPropagation();
    });


    // make main menu sticky
    var ieversion = 0;
    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { //test for MSIE x.x;
        ieversion = new Number(RegExp.$1); // capture x.x portion and store as a number
    }
    if ((!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) && ((ieversion >= 10) || (ieversion == 0))) {
        $(".header").sticky({
            topSpacing: 0
        });
    } else {}

    $('#responsive-menu-button').sidr({
        source: '#navigation',
        side: 'right',
        onOpen: function () {
            $('#responsive-menu-button').attr('class', 'navbar-toggle active');
            $(".darkLayer").addClass("show");
        },
        onClose: function () {
            $('#responsive-menu-button').attr('class', 'navbar-toggle ');
            $(".darkLayer").removeClass("show");
        }

    });


    $('#layerslider').layerSlider({
        sublayerContainer: 1100,
        thumbnailNavigation: false,
        navButtons: false,
        responsive: false,
        responsiveUnder: 460,
        skinsPath: './css/',
        skin: 'fullwidth',
        globalBGColor: 'transparent',
        hoverPrevNext: false,
        navStartStop: false,
        showCircleTimer: false,
        cbInit: function (element) {},
        cbStart: function (data) {},
        cbStop: function (data) {},
        cbPause: function (data) {},
        cbAnimStart: function (data) {},
        cbAnimStop: function (data) {},
        cbPrev: function (data) {},
        cbNext: function (data) {}
    });




    $('.carousel').carousel({
        pause: true,
        interval: false
    });

    $('#owl-destaques').owlCarousel({
        loop: true,
        nav: false,
        navText: [],
        navClass: ['owl-prev fa fa-chevron-left', 'owl-next fa fa-chevron-right'],
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    });

    $('#owl-noticias').owlCarousel({
        nav: true,
        items: 1,
        autoHeight:true,
        dots: false,
        navText: []
    });

    $('#owl-central').owlCarousel({
        nav: true,
        items: 1,
        dots: true,
        navText: [],
        navClass: ['owl-prev fa fa-angle-left', 'owl-next fa fa-angle-right']
    });
    
    $('#owl-acucar').owlCarousel({
        loop: false,
        URLhashListener: true,
        autoplayHoverPause: true,
        startPosition: 'URLHash',
        animateIn: 'fadeIn',
        nav: true,
        items: 1,
        dots: false,
        navText: []
    });

            $('#owl-linhadotempo').owlCarousel({
        dots: false,
        nav: true,
        margin: 25,
        navText: [],
        navClass: ['owl-prev fa fa-chevron-left', 'owl-next fa fa-chevron-right'],
        responsive: {
            0: {
                items: 3
            },
            600: {
                items: 4
            },
            1000: {
                items: 6
            }
        }
    });
    
    $('#owl-timeline2').owlCarousel({
        dots: false,
        nav: true,
        margin: 25,
        navText: [],
        navClass: ['owl-prev fa fa-chevron-left', 'owl-next fa fa-chevron-right'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
	
	$('#owl-timeline0').owlCarousel({
        dots: false,
        nav: true,
        margin: 25,
        navText: [],
        navClass: ['owl-prev fa fa-chevron-left', 'owl-next fa fa-chevron-right'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });

    $('[data-toggle="tooltip"]').tooltip({
        html: true,
        container: 'body'
    });

    $('[data-toggle="popover"]').popover({
        html: true,
        container: 'body'
    });

    $(".combo-ano select, .combo-alertas select, .form-contato select").uniform({
        selectAutoWidth: false
    });

    $('div.bg-cotacao marquee').marquee('pointer').mouseover(function () {
        $(this).trigger('stop');
    }).mouseout(function () {
        $(this).trigger('start');
    }).mousemove(function (event) {
        if ($(this).data('drag') == true) {
            this.scrollLeft = $(this).data('scrollX') + ($(this).data('x') - event.clientX);
        }
    }).mousedown(function (event) {
        $(this).data('drag', true).data('x', event.clientX).data('scrollX', this.scrollLeft);
    }).mouseup(function () {
        $(this).data('drag', false);
    });



});




(function ($) {

    $.fn.marquee = function (klass) {
        var newMarquee = [],
            last = this.length;

        // works out the left or right hand reset position, based on scroll
        // behavior, current direction and new direction
        function getReset(newDir, marqueeRedux, marqueeState) {
            var behavior = marqueeState.behavior,
                width = marqueeState.width,
                dir = marqueeState.dir;
            var r = 0;
            if (behavior == 'alternate') {
                r = newDir == 1 ? marqueeRedux[marqueeState.widthAxis] - (width * 2) : width;
            } else if (behavior == 'slide') {
                if (newDir == -1) {
                    r = dir == -1 ? marqueeRedux[marqueeState.widthAxis] : width;
                } else {
                    r = dir == -1 ? marqueeRedux[marqueeState.widthAxis] - (width * 2) : 0;
                }
            } else {
                r = newDir == -1 ? marqueeRedux[marqueeState.widthAxis] : 0;
            }
            return r;
        }

        // single "thread" animation
        function animateMarquee() {
            var i = newMarquee.length,
                marqueeRedux = null,
                $marqueeRedux = null,
                marqueeState = {},
                newMarqueeList = [],
                hitedge = false;

            while (i--) {
                marqueeRedux = newMarquee[i];
                $marqueeRedux = $(marqueeRedux);
                marqueeState = $marqueeRedux.data('marqueeState');

                if ($marqueeRedux.data('paused') !== true) {
                    // TODO read scrollamount, dir, behavior, loops and last from data
                    marqueeRedux[marqueeState.axis] += (marqueeState.scrollamount * marqueeState.dir);

                    // only true if it's hit the end
                    hitedge = marqueeState.dir == -1 ? marqueeRedux[marqueeState.axis] <= getReset(marqueeState.dir * -1, marqueeRedux, marqueeState) : marqueeRedux[marqueeState.axis] >= getReset(marqueeState.dir * -1, marqueeRedux, marqueeState);

                    if ((marqueeState.behavior == 'scroll' && marqueeState.last == marqueeRedux[marqueeState.axis]) || (marqueeState.behavior == 'alternate' && hitedge && marqueeState.last != -1) || (marqueeState.behavior == 'slide' && hitedge && marqueeState.last != -1)) {
                        if (marqueeState.behavior == 'alternate') {
                            marqueeState.dir *= -1; // flip
                        }
                        marqueeState.last = -1;

                        $marqueeRedux.trigger('stop');

                        marqueeState.loops--;
                        if (marqueeState.loops === 0) {
                            if (marqueeState.behavior != 'slide') {
                                marqueeRedux[marqueeState.axis] = getReset(marqueeState.dir, marqueeRedux, marqueeState);
                            } else {
                                // corrects the position
                                marqueeRedux[marqueeState.axis] = getReset(marqueeState.dir * -1, marqueeRedux, marqueeState);
                            }

                            $marqueeRedux.trigger('end');
                        } else {
                            // keep this marquee going
                            newMarqueeList.push(marqueeRedux);
                            $marqueeRedux.trigger('start');
                            marqueeRedux[marqueeState.axis] = getReset(marqueeState.dir, marqueeRedux, marqueeState);
                        }
                    } else {
                        newMarqueeList.push(marqueeRedux);
                    }
                    marqueeState.last = marqueeRedux[marqueeState.axis];

                    // store updated state only if we ran an animation
                    $marqueeRedux.data('marqueeState', marqueeState);
                } else {
                    // even though it's paused, keep it in the list
                    newMarqueeList.push(marqueeRedux);
                }
            }

            newMarquee = newMarqueeList;

            if (newMarquee.length) {
                setTimeout(animateMarquee, 25);
            }
        }

        // TODO consider whether using .html() in the wrapping process could lead to loosing predefined events...
        this.each(function (i) {
            var $marquee = $(this),
                width = $marquee.attr('width') || $marquee.width(),
                height = $marquee.attr('height') || $marquee.height(),
                $marqueeRedux = $marquee.after('<div ' + (klass ? 'class="' + klass + '" ' : '') + 'style="display: block-inline; width: ' + width + 'px; height: ' + height + 'px; overflow: hidden;"><div style="float: left; white-space: nowrap;">' + $marquee.html() + '</div></div>').next(),
                marqueeRedux = $marqueeRedux.get(0),
                hitedge = 0,
                direction = ($marquee.attr('direction') || 'left').toLowerCase(),
                marqueeState = {
                    dir: /down|right/.test(direction) ? -1 : 1,
                    axis: /left|right/.test(direction) ? 'scrollLeft' : 'scrollTop',
                    widthAxis: /left|right/.test(direction) ? 'scrollWidth' : 'scrollHeight',
                    last: -1,
                    loops: $marquee.attr('loop') || -1,
                    scrollamount: $marquee.attr('scrollamount') || this.scrollAmount || 2,
                    behavior: ($marquee.attr('behavior') || 'scroll').toLowerCase(),
                    width: /left|right/.test(direction) ? width : height
                };

            // corrects a bug in Firefox - the default loops for slide is -1
            if ($marquee.attr('loop') == -1 && marqueeState.behavior == 'slide') {
                marqueeState.loops = 1;
            }

            $marquee.remove();

            // add padding
            if (/left|right/.test(direction)) {
                $marqueeRedux.find('> div').css('padding', '0 ' + width + 'px');
            } else {
                $marqueeRedux.find('> div').css('padding', height + 'px 0');
            }

            // events
            $marqueeRedux.bind('stop', function () {
                $marqueeRedux.data('paused', true);
            }).bind('pause', function () {
                $marqueeRedux.data('paused', true);
            }).bind('start', function () {
                $marqueeRedux.data('paused', false);
            }).bind('unpause', function () {
                $marqueeRedux.data('paused', false);
            }).data('marqueeState', marqueeState); // finally: store the state

            // todo - rerender event allowing us to do an ajax hit and redraw the marquee

            newMarquee.push(marqueeRedux);

            marqueeRedux[marqueeState.axis] = getReset(marqueeState.dir, marqueeRedux, marqueeState);
            $marqueeRedux.trigger('start');

            // on the very last marquee, trigger the animation
            if (i + 1 == last) {
                animateMarquee();
            }
        });

        return $(newMarquee);
    };



    $(function () {
        $('.jcarousel')
            .jcarousel({
                vertical: true,
                size: 3
            });

        $('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function () {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function () {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function () {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function () {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function () {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function () {
                $(this).removeClass('active');
            })
            .jcarouselPagination();
    });



})(jQuery);

var $sync1 = $("#owl-timeline1"),
    $sync2 = $("#owl-timeline2"),
    duration = 300;


$sync1
    .owlCarousel({
        items: 1,
        dots: true,
        nav: true,
        autoHeight: true,
        navText: []
    })
    .on('changed.owl.carousel', function (e) {
        var syncedPosition = syncPosition(e.item.index);

        if (syncedPosition != "stayStill") {
            $sync2.trigger('to.owl.carousel', [syncedPosition, duration, true]);
        }
    });

//thumbs
$sync2
    .on('initialized.owl.carousel', function () { //must go before owl carousel initialization
        addClassCurrent(0);
    })
    .owlCarousel({ //owl carousel init
        dots: true,
        nav: false,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 6
            },
            1000: {
                items: 9
            }
        }
    })
    .on('click', '.owl-item', function () {
        $sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
    });


//adds 'current' class to the thumbnail
function addClassCurrent(index) {
    $sync2
        .find(".owl-item")
        .removeClass("synced")
        .eq(index).addClass("synced");
}

//syncs positions. argument 'index' represents absolute position of the element
function syncPosition(index) {

    //PART 1 (adds 'current' class to thumbnail)
    addClassCurrent(index);


    //PART 2 (counts position)

    var itemsNo = $sync2.find(".owl-item").length; //total items
    var visibleItemsNo = $sync2.find(".owl-item.active").length; //visible items

    //if all items are visible
    if (itemsNo === visibleItemsNo) {
        return "stayStill";
    }

    //relative index (if 4 elements are visible and the 2nd of them has class 'current', returns index = 1)
    var visibleCurrentIndex = $sync2.find(".owl-item.active").index($sync2.find(".owl-item.synced"));

    //if it's first visible element and if there is hidden element before it
    if (visibleCurrentIndex == 0 && index != 0) {
        return index - 1;
    }

    //if it's last visible element and if there is hidden element after it
    if (visibleCurrentIndex == (visibleItemsNo - 1) && index != (itemsNo - 1)) {
        return index - visibleItemsNo + 2;
    }

    return "stayStill";
}
// ./SYNCED OWL CAROUSEL




// Abrir menu ./

$('#responsive-menu-button').sidr({
    source: '#navigation',
    side: 'right',
    onOpen: function () {
        $('#responsive-menu-button').attr('class', 'navbar-toggle active');
        $(".darkLayer").addClass("show");
    },
    onClose: function () {
        $('#responsive-menu-button').attr('class', 'navbar-toggle ');
        $(".darkLayer").removeClass("show");
    }

});
