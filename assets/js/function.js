(function($) {
    "use strict";

    var $window = $(window);
    var $body = $('body');

    /* Preloader Effect */
    setTimeout(function() {
        $(".preloader").fadeOut(600);
    }, 1000);

    /* Sticky Header */
    if ($('.active-sticky-header').length) {
        $window.on('resize', function() {
            setHeaderHeight();
        });

        function setHeaderHeight() {
            $("header.main-header").css("height", $('header .header-sticky').outerHeight());
        }

        $window.on("scroll", function() {
            var fromTop = $(window).scrollTop();
            setHeaderHeight();
            var headerHeight = $('header .header-sticky').outerHeight()
            $("header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
            $("header .header-sticky").toggleClass("active", (fromTop > 600));
        });
    }

    /* Slick Menu JS */
    $('#menu').slicknav({
        label: '',
        prependTo: '.responsive-menu'
    });

    if ($("a[href='#top']").length) {
        $(document).on("click", "a[href='#top']", function() {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            return false;
        });
    }

    /* Hero Slider Layout JS */
    const hero_slider_layout = new Swiper('.hero-slider-layout .swiper', {
        effect: 'fade',
        slidesPerView: 1,
        speed: 1000,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 4000,
        },
        pagination: {
            el: '.hero-pagination',
            clickable: true,
        },
    });

    /* testimonial Slider JS */
    if ($('.testimonial-slider').length) {
        const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.testimonial-btn-next',
                prevEl: '.testimonial-btn-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 2,
                }
            }
        });
    }

    /* Skill Bar */
    if ($('.skills-progress-bar').length) {
        $('.skills-progress-bar').waypoint(function() {
            $('.skillbar').each(function() {
                $(this).find('.count-bar').animate({
                    width: $(this).attr('data-percent')
                }, 2000);
            });
        }, {
            offset: '70%'
        });
    }

    /* Youtube Background Video JS */
    if ($('#herovideo').length) {
        var myPlayer = $("#herovideo").YTPlayer();
    }

    /* Init Counter */
    if ($('.counter').length) {
        $('.counter').counterUp({
            delay: 6,
            time: 3000
        });
    }

    /* Image Reveal Animation */
    if ($('.reveal').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            });
        });
    }

    /* Text Effect Animation */
    if ($('.text-anime-style-1').length) {
        let staggerAmount = 0.05,
            translateXValue = 0,
            delayValue = 0.5,
            animatedTextElements = document.querySelectorAll('.text-anime-style-1');

        animatedTextElements.forEach((element) => {
            let animationSplitText = new SplitText(element, {
                type: "chars, words"
            });
            gsap.from(animationSplitText.words, {
                duration: 1,
                delay: delayValue,
                x: 20,
                autoAlpha: 0,
                stagger: staggerAmount,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%"
                },
            });
        });
    }

    if ($('.text-anime-style-2').length) {
        let staggerAmount = 0.03,
            translateXValue = 20,
            delayValue = 0.1,
            easeType = "power2.out",
            animatedTextElements = document.querySelectorAll('.text-anime-style-2');

        animatedTextElements.forEach((element) => {
            let animationSplitText = new SplitText(element, {
                type: "chars, words"
            });
            gsap.from(animationSplitText.chars, {
                duration: 1,
                delay: delayValue,
                x: translateXValue,
                autoAlpha: 0,
                stagger: staggerAmount,
                ease: easeType,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%"
                },
            });
        });
    }

    if ($('.text-anime-style-3').length) {
        let animatedTextElements = document.querySelectorAll('.text-anime-style-3');

        animatedTextElements.forEach((element) => {
            //Reset if needed
            if (element.animation) {
                element.animation.progress(1).kill();
                element.split.revert();
            }

            element.split = new SplitText(element, {
                type: "lines,words,chars",
                linesClass: "split-line",
            });
            gsap.set(element, {
                perspective: 400
            });

            gsap.set(element.split.chars, {
                opacity: 0,
                x: "50",
            });

            element.animation = gsap.to(element.split.chars, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 90%"
                },
                x: "0",
                y: "0",
                rotateX: "0",
                opacity: 1,
                duration: 1,
                ease: Back.easeOut,
                stagger: 0.02,
            });
        });
    }

    /* Parallaxie js */
    var $parallaxie = $('.parallaxie');
    if ($parallaxie.length && ($window.width() > 991)) {
        if ($window.width() > 768) {
            $parallaxie.parallaxie({
                speed: 0.55,
                offset: 0,
            });
        }
    }

    /* Zoom Gallery screenshot */
    $('.gallery-items').magnificPopup({
        delegate: 'a:not(.btn-default-sm)',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom',
        image: {
            verticalFit: true,
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }
    });

    /* Contact form validation */
    var $contactform = $("#contactForm");
    $contactform.validator({
        focus: false
    }).on("submit", function(event) {
        if (!event.isDefaultPrevented()) {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        var $btn = $contactform.find('button[type="submit"]');
        var originalBtnText = $btn.html();
        
        // Show loading state
        $btn.prop('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Sending...');
        $("#msgSubmit").addClass('hidden').removeClass('text-success text-danger h4 h3').text('');

        // Prepare data as JSON
        var formData = {};
        $contactform.serializeArray().forEach(function(item) {
            formData[item.name] = item.value;
        });

        /* Ajax call to submit form */
        $.ajax({
            type: "POST",
            url: "https://leadsmanagment.hindustandigitalservices.com/api/forms/submit/2d5cd4d1-f34f-49dc-b84f-a39e12c1db64",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function(response) {
                $btn.prop('disabled', false).html(originalBtnText);
                formSuccess();
            },
            error: function(xhr, status, error) {
                $btn.prop('disabled', false).html(originalBtnText);
                var errMsg = "Something went wrong. Please try again.";
                if (xhr.responseJSON) {
                    if (xhr.responseJSON.message) {
                        errMsg = xhr.responseJSON.message;
                    } else if (xhr.responseJSON.error) {
                        errMsg = xhr.responseJSON.error;
                    } else if (xhr.responseJSON.errors && Array.isArray(xhr.responseJSON.errors)) {
                        errMsg = xhr.responseJSON.errors.join(", ");
                    }
                } else if (xhr.responseText) {
                    try {
                        var parsed = JSON.parse(xhr.responseText);
                        if (parsed.message) {
                            errMsg = parsed.message;
                        } else if (parsed.error) {
                            errMsg = parsed.error;
                        }
                    } catch(e) {
                        if (xhr.responseText.length < 100) {
                            errMsg = xhr.responseText;
                        }
                    }
                }
                submitMSG(false, errMsg);
            }
        });
    }

    function formSuccess() {
        $contactform[0].reset();
        submitMSG(true, "Thank you! Your message has been sent successfully.");
    }

    function submitMSG(valid, msg) {
        var msgClasses = valid ? "h4 text-success" : "h4 text-danger";
        $("#msgSubmit").removeClass('hidden').removeClass('text-success text-danger h4 h3').addClass(msgClasses).text(msg).hide().fadeIn();
    }
    /* Contact form validation end */

    /* Appointment form validation */
    var $requestquoteForm = $("#requestquoteForm");
    $requestquoteForm.validator({
        focus: false
    }).on("submit", function(event) {
        if (!event.isDefaultPrevented()) {
            event.preventDefault();
            submitappointmentForm();
        }
    });

    function submitappointmentForm() {
        var $btn = $requestquoteForm.find('button[type="submit"]');
        var originalBtnText = $btn.html();

        // Show loading state
        $btn.prop('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Sending...');
        $("#msgSubmit").addClass('hidden').removeClass('text-success text-danger h4 h3').text('');

        // Prepare data as JSON
        var formData = {};
        $requestquoteForm.serializeArray().forEach(function(item) {
            formData[item.name] = item.value;
        });

        /* Ajax call to submit form */
        $.ajax({
            type: "POST",
            url: "https://leadsmanagment.hindustandigitalservices.com/api/forms/submit/2d5cd4d1-f34f-49dc-b84f-a39e12c1db64",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function(response) {
                $btn.prop('disabled', false).html(originalBtnText);
                appointmentformSuccess();
            },
            error: function(xhr, status, error) {
                $btn.prop('disabled', false).html(originalBtnText);
                var errMsg = "Something went wrong. Please try again.";
                if (xhr.responseJSON) {
                    if (xhr.responseJSON.message) {
                        errMsg = xhr.responseJSON.message;
                    } else if (xhr.responseJSON.error) {
                        errMsg = xhr.responseJSON.error;
                    } else if (xhr.responseJSON.errors && Array.isArray(xhr.responseJSON.errors)) {
                        errMsg = xhr.responseJSON.errors.join(", ");
                    }
                } else if (xhr.responseText) {
                    try {
                        var parsed = JSON.parse(xhr.responseText);
                        if (parsed.message) {
                            errMsg = parsed.message;
                        } else if (parsed.error) {
                            errMsg = parsed.error;
                        }
                    } catch(e) {
                        if (xhr.responseText.length < 100) {
                            errMsg = xhr.responseText;
                        }
                    }
                }
                appointmentsubmitMSG(false, errMsg);
            }
        });
    }

    function appointmentformSuccess() {
        $requestquoteForm[0].reset();
        appointmentsubmitMSG(true, "Thank you! Your quote request has been sent successfully.");
    }

    function appointmentsubmitMSG(valid, msg) {
        var msgClasses = valid ? "h3 text-success" : "h3 text-danger";
        $("#msgSubmit").removeClass('hidden').removeClass('text-success text-danger h4 h3').addClass(msgClasses).text(msg).hide().fadeIn();
    }
    /* Appointment form validation end */

    /* Animated Wow Js */
    new WOW().init();

    /* Popup Video */
    if ($('.popup-video').length) {
        $('.popup-video').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: true
        });
    }

    /* Service Entry Step Item Active Start */
    var $service_solution_steps = $('.service-solution-steps');
    if ($service_solution_steps.length) {
        var $service_step = $service_solution_steps.find('.service-solution-step-item');

        if ($service_step.length) {
            $service_step.on({
                mouseenter: function() {
                    if (!$(this).hasClass('active')) {
                        $service_step.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function() {
                    // Optional: Add logic for mouse leave if needed
                }
            });
        }
    }
    /*Service Entry Step Item Active End  */

    /* Match Team Heights JS */
    function matchTeamHeights() {
        if ($window.width() >= 992) {
            var $mdImage = $('.main-team-column .team-image img');
            if ($mdImage.length) {
                var mdImgHeight = $mdImage.height();
                if (mdImgHeight > 0) {
                    $('.right-team-column').css('height', mdImgHeight + 'px');
                }
            }
        } else {
            $('.right-team-column').css('height', 'auto');
        }
    }

    $window.on('load resize', function() {
        matchTeamHeights();
    });

    $('.main-team-column .team-image img').on('load', function() {
        matchTeamHeights();
    });

    $(document).ready(function() {
        matchTeamHeights();
        setTimeout(matchTeamHeights, 100);
        setTimeout(matchTeamHeights, 500);
        setTimeout(matchTeamHeights, 1500);
    });

    /* Floating Action Scroll-to-Top Button Show/Hide & Action */
    $(document).ready(function() {
        var scrollTopBtn = document.getElementById('scrollTopBtn');
        if (scrollTopBtn) {
            window.addEventListener('scroll', function() {
                var scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
                if (scrollPos > 200) {
                    scrollTopBtn.classList.add('show');
                } else {
                    scrollTopBtn.classList.remove('show');
                }
            });

            scrollTopBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    });

    /* WhatsApp Popup Form Functionality */
    $(document).ready(function() {
        var waModalHtml = 
            '<div class="whatsapp-modal-overlay" id="whatsappModal">' +
            '    <div class="whatsapp-modal-card">' +
            '        <button class="whatsapp-modal-close" id="whatsappModalClose">&times;</button>' +
            '        <div class="whatsapp-modal-header">' +
            '            <div class="whatsapp-modal-icon">' +
            '                <i class="fa-brands fa-whatsapp"></i>' +
            '            </div>' +
            '            <h3>Connect on WhatsApp</h3>' +
            '            <p>Please enter your details to start the conversation.</p>' +
            '        </div>' +
            '        <form id="whatsappPopupForm">' +
            '            <div class="whatsapp-form-group">' +
            '                <label for="wa_name">Your Name</label>' +
            '                <div class="whatsapp-input-wrapper">' +
            '                    <input type="text" id="wa_name" name="name" placeholder="John Doe" required>' +
            '                    <i class="fa-solid fa-user"></i>' +
            '                </div>' +
            '            </div>' +
            '            <div class="whatsapp-form-group">' +
            '                <label for="wa_phone">Contact Number</label>' +
            '                <div class="whatsapp-input-wrapper">' +
            '                    <input type="tel" id="wa_phone" name="phone" placeholder="91XXXXXXXX" required>' +
            '                    <i class="fa-solid fa-phone"></i>' +
            '                </div>' +
            '            </div>' +
            '            <button type="submit" class="whatsapp-submit-btn" id="waSubmitBtn">' +
            '                <span>Submit & Chat</span> <i class="fa-solid fa-paper-plane"></i>' +
            '            </button>' +
            '            <div id="waMsgSubmit" class="whatsapp-msg hidden"></div>' +
            '        </form>' +
            '    </div>' +
            '</div>';
        
        $('body').append(waModalHtml);

        var whatsappUrl = "https://wa.me/919168682435"; // Fallback URL
        
        $(document).on('click', '.btn-whatsapp', function(e) {
            e.preventDefault();
            var href = $(this).attr('href');
            if (href && href !== '#' && href !== '') {
                whatsappUrl = href;
            }
            $('#whatsappModal').addClass('active');
            $('body').css('overflow', 'hidden'); // Prevent background scrolling
        });

        $(document).on('click', '#whatsappModalClose, .whatsapp-modal-overlay', function(e) {
            if (e.target === this || $(this).attr('id') === 'whatsappModalClose') {
                $('#whatsappModal').removeClass('active');
                $('body').css('overflow', ''); // Restore background scrolling
            }
        });

        $(document).on('submit', '#whatsappPopupForm', function(e) {
            e.preventDefault();
            var $form = $(this);
            var $btn = $form.find('#waSubmitBtn');
            var originalBtnText = $btn.html();
            
            $btn.prop('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Submitting...');
            $('#waMsgSubmit').addClass('hidden').removeClass('text-success text-danger').text('');

            var formData = {};
            $form.serializeArray().forEach(function(item) {
                formData[item.name] = item.value;
            });
            formData['type'] = 'whatsapp';
            formData['source'] = 'WhatsApp Floating Button';

            $.ajax({
                type: "POST",
                url: "https://leadsmanagment.hindustandigitalservices.com/api/forms/submit/2d5cd4d1-f34f-49dc-b84f-a39e12c1db64",
                contentType: "application/json",
                data: JSON.stringify(formData),
                success: function(response) {
                    $btn.prop('disabled', false).html(originalBtnText);
                    $form[0].reset();
                    $('#whatsappModal').removeClass('active');
                    $('body').css('overflow', '');
                    
                    // Open WhatsApp link
                    window.open(whatsappUrl, '_blank');
                },
                error: function(xhr, status, error) {
                    $btn.prop('disabled', false).html(originalBtnText);
                    var errMsg = "Something went wrong. Please try again.";
                    if (xhr.responseJSON) {
                        if (xhr.responseJSON.message) {
                            errMsg = xhr.responseJSON.message;
                        } else if (xhr.responseJSON.error) {
                            errMsg = xhr.responseJSON.error;
                        }
                    }
                    $('#waMsgSubmit').removeClass('hidden').addClass('text-danger').text(errMsg);
                }
            });
        });
    });

})(jQuery);