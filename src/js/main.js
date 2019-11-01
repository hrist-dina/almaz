import ExploitationForm from "./form/exploitationForm";
import AuthForm from "./form/authForm";
import Inputmask from "inputmask";
import {BaseModal} from "./base-modal";


$(document).ready(function () {
    $('.js-form-exploitation').each((i, el) => {
        new ExploitationForm(el);
    });
    $('.js-form-auth').each((i, el) => {
        new AuthForm(el);
    });


    new BaseModal();


    let sliderSet = {
        loop: false,
        // autoplay:true,
        // autoplaySpeed:1000,
        // autoplayTimeout:3000,
        // autoplayHoverPause:true,
        margin: 10,
        items: 1,
        nav: true,
        navContainerClass: 'slider-nav',
        navText: ['<img src="../img/arrow-left-y.svg" alt="">', '<img src="../img/arrow-right-y.svg" alt="">'],
        navElement: 'div',
        dotsClass: 'slider-dots',
        dotClass: 'slider-dot',
        navSpeed: 500,
        dotsSpeed: 500,
        dragEndSpeed: 500,
        responsiveClass: false,
        responsive: {
            0: {
                nav: false,
                dots: true,
            },
            900: {
                dots: false,
                nav: true,
            }
        },
    }

    let sliderSetBig = {};
    Object.assign(sliderSetBig, sliderSet);
    Object.assign(sliderSetBig, {
        onChanged: sliderCount
    });
    $(".big-slider").owlCarousel(sliderSetBig);


    let sliderSetNews = {};
    Object.assign(sliderSetNews, sliderSet);
    Object.assign(sliderSetNews, {
        margin: 20,
        navContainerClass: 'slider-nav news',
        items: 2,
        responsive: {
            0: {
                nav: false,
                dots: true,
                items: 1
            },
            900: {
                dots: false,
                nav: true,
                items: 2
            }
        }
    });
    $(".news-slider").owlCarousel(sliderSetNews);


    let sliderSetSquare = {};
    Object.assign(sliderSetSquare, sliderSet);
    Object.assign(sliderSetSquare, {
        margin: 20,
        navContainerClass: 'slider-nav square',
        items: 2,
        navText: ['<img src="../img/arrow-left.svg" alt="">', '<img src="../img/arrow-right.svg" alt="">'],
        responsive: {
            0: {
                nav: false,
                dots: true,
                items: 1
            },
            900: {
                dots: false,
                nav: true,
                items: 2
            }
        }
    });
    $(".square-slider").owlCarousel(sliderSetSquare);


    function sliderCount(e) {
        setTimeout(function () {
            // console.log(e);
            var slider = e.target,
                currentSlide = $(slider).find('.owl-item.active')
                    .last()
                    .find('[data-slide]')
                    .attr('data-slide'),
                countActiveSlide = $(slider).find('.owl-item.active').length;

            if (Math.ceil(currentSlide / countActiveSlide) < 10) {
                $(e.target).find('.big-slide__count-current').text('0' + Math.ceil(currentSlide / countActiveSlide));
            } else {
                $(e.target).find('.big-slide__count-current').text(Math.ceil(currentSlide / countActiveSlide));
            }

            if (Math.ceil(e.item.count / countActiveSlide) < 10) {
                $(e.target).find('.big-slide__count-all').text('0' + Math.ceil(e.item.count / countActiveSlide));
            } else {
                $(e.target).find('.big-slide__count-all').text(Math.ceil(e.item.count / countActiveSlide));
            }

        }, 100);
    }

    /* slow scroll */
    window.scrollToPos = function (scrollTop) {
        var $viewport = $('html, body');
        $viewport.animate({
            scrollTop: scrollTop
        }, 1000);
        $viewport.bind('scroll mousedown DOMMouseScroll mousewheel keyup', function (event) {
            if (event.which > 0 || event.type === 'mousedown' || event.type === 'mousewheel') {
                $viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup');
            }
        });
    }
    window.initScrollToPos = function (element, pos, offset) {
        $(element).on('click', function (event) {
            event.preventDefault();
            if (typeof (pos) != 'number') {
                offSetEl = $(pos).offset().top - offset;
            } else {
                offSetEl = pos;
            }
            window.scrollToPos(offSetEl);
        });
    }
    // initScrollToPos('.CLASS', 'CLASS OR' NUMBER, 80);

    jQuery(function ($) {
        let imTel = new Inputmask({
            mask: "+7 (999) 999-9999",
            showMaskOnHover: false
        });
        imTel.mask('.js-tel');
        imTel.mask('.js-mask-phone');

        let imDate = new Inputmask({
            mask: "99.99.9999",
            showMaskOnHover: false
        });
        imDate.mask(".js-date");

        let imTin = new Inputmask({
            mask: "99-9999999",
            showMaskOnHover: false
        })
        imTin.mask("#tin");

        let imSsn = new Inputmask({
            mask: "999-99-9999",
            showMaskOnHover: false
        })
        imSsn.mask("#ssn");
    });
    //form menu-search
    $('.page-nav__search').on('click', function (e) {
        e.preventDefault();
        $('body').addClass('menu-active');
        $('.menu-search__input').focus();
    });

    let searchValue = '';
    $('.menu-search__input').on('keyup', function () {
        searchValue = this.value;
        if (searchValue != '') {
            $('.menu-search').find('form').addClass('active');
            $('.menu-blocks,.menu-phone').css('display', 'none');
            $('.menu-search-help').css('display', 'block');
        } else {
            $('.menu-search').find('form').removeClass('active');
            $('.menu-blocks,.menu-phone').css('display', 'block');
            $('.menu-search-help').css('display', 'none');
        }
    });

    $('.menu-search__input').on('change', function () {
        searchValue = this.value;
        if (searchValue != '') {
            $('.menu-search').find('form').addClass('active');
            $('.menu-blocks,.menu-phone').css('display', 'none');
            $('.menu-search-help').css('display', 'block');
        } else {
            $('.menu-search').find('form').removeClass('active');
            $('.menu-blocks,.menu-phone').css('display', 'block');
            $('.menu-search-help').css('display', 'none');
        }
    });

    $('.menu-search').find('form').on('submit', function (e) {
        if (searchValue == '') {
            e.preventDefault();
        } else {
            //code...
        }
    });

    //menu
    $('.page-nav__menu,.header__burger').on('click', function (e) {
        e.preventDefault();
        $('body').addClass('menu-active');
    });

    $('.page-nav__exit,.menu__exit').on('click', function (e) {
        $('body').removeClass('menu-active');
    });

    //header tabs
    $('.page-header__tab').on('click', function (e) {
        e.preventDefault();
        let indexEl = $(this).index();
        let offsetEl = $('[data-header-tab]').eq(indexEl).offset().top;
        window.scrollToPos(offsetEl);
    });

    //accordion
    $('.accordion-item__top').on('click', function () {
        if ($('.accordion-item').hasClass('active') && !$(this).parent().hasClass('active')) {
            let _this = this;
            setTimeout(function () {
                scrollToPos($(_this).parent().offset().top - 100);
            }, 10);
        }
        if (!$(this).parent().hasClass('active')) {
            $('.accordion-item').removeClass('active');
            $(this).parent().addClass('active');
        } else {
            $(this).parent().removeClass('active');
        }
    });

    //main form
    let formValue = '';
    $('.form__input.tel').on('keyup', function () {
        formValue = this.value;
        console.log(formValue);
        if (formValue != '') {
            $('.form-main-js').addClass('active');
        } else {
            $('.form-main-js').removeClass('active');
        }
    });

    $('.form__input.tel').on('change', function () {
        formValue = this.value;
        if (formValue != '') {
            $('.form-main-js').addClass('active');
            $('.menu-blocks,.menu-phone').css('display', 'none;');
        } else {
            $('.form-main-js').removeClass('active');
        }
    });

    $('.form-main-js').on('submit', function (e) {
        if (formValue == '') {
            e.preventDefault();
        } else {
            //code...
        }
    });

    //regions
    $('.page-nav__location,.header__location').on('click', function (e) {
        e.preventDefault();
        $('body').addClass('regions-active');
        $('.regions__search-input').focus();
    });

    $('.regions__exit').on('click', function (e) {
        e.preventDefault();
        $('body').removeClass('regions-active');
    });

    //form regions-search
    let regionsArr = ["Адыгея", "Алтай, Республика", "Алтайский край", "Амурская область", "Архангельская область", "Астраханская область", "Башкортостан", "Белгородская область", "Брянская область", "Бурятия", "Владимирская область", "Волгоградская область", "Вологодская область", "Воронежская область", "Дагестан", "Еврейская автономная область", "Забайкальский край", "Ивановская область", "Ингушетия", "Иркутская область", "Кабардино-Балкарская Республика", "Калининградская область", "Калмыкия", "Калужская область", "Камчатский край", "Карачаево-Черкессия", "Карелия", "Кемеровская область", "Кировская область", "Коми", "Костромская область", "Краснодарский край", "Красноярский край", "Крым", "Курганская область", "Курская область", "Ленинградская область", "Липецкая область", "Магаданская область", "Марий Эл", "Мордовия", "Москва", "Московская область", "Мурманская область", "Ненецкий автономный округ", "Нижегородская область", "Новгородская область", "Новосибирская область", "Омская область", "Оренбургская область", "Орловская область", "Пензенская область", "Пермский край", "Приморский край", "Псковская область", "Ростовская область", "Рязанская область", "Самарская область", "Санкт-Петербург", "Саратовская область", "Саха (Якутия)", "Сахалинская область", "Свердловская область", "Северная Осетия (Алания)", "Смоленская область", "Ставропольский край", "Тамбовская область", "Татарстан", "Тверская область", "Томская область", "Тульская область", "Тыва (Тува)", "Тюменская область", "Удмуртия", "Ульяновская область", "Хабаровский край", "Хакасия", "Ханты-Мансийский автономный округ", "Челябинская область", "Чечня", "Чувашия", "Чукотский автономный округ", "Ямало-Ненецкий автономный округ", "Ярославская область", "Азербайджан", "Армения", "Грузия", "Кыргызская Республика", "Монголия", "Республика Беларусь", "Республика Казахстан", "Республика Молдова", "Таджикестан", "Узбескистан", "Россия"];


    function regionsRequest(name) {
        $('.regions__help').html('');
        $.each(regionsArr, function (i, item) {
            if (item.indexOf(name) != -1) {
                $('.regions__help').append('<div class="regions__help-item">' + item + '</div>');
            }
        });

        $('.regions__help-item').on('click', function (e) {
            let elName = $(this).text();
            setCookie('regionCur', elName, {
                expires: '86400‬00',
                path: '/',
                domain: window.location.hostname,
            });
            $('.hint-region__text').text(getCookie('regionCur'));
            $('body').removeClass('regions-active');
            $('.hint-region-ask').removeClass('active');
        });
    }

    let regionSearchValue = '';
    $('.regions__search-input').on('keyup', function () {
        regionSearchValue = this.value;
        if (regionSearchValue != '') {
            $('.regions__search').find('form').addClass('active');
            $('.regions__country,.regions__russia').css('display', 'none');
            $('.regions__help').css('display', 'block');
            regionsRequest(regionSearchValue);
        } else {
            $('.regions__search').find('form').removeClass('active');
            $('.regions__country').css('display', 'flex');
            $('.regions__russia').css('display', 'block');
            $('.regions__help').css('display', 'none');
        }
    });

    $('.regions__search-input').on('change', function () {
        regionSearchValue = this.value;
        if (regionSearchValue != '') {
            $('.regions__search').find('form').addClass('active');
            $('.regions__country,.regions__russia').css('display', 'none');
            $('.regions__help').css('display', 'block');
        } else {
            $('.regions__search').find('form').removeClass('active');
            $('.regions__country').css('display', 'flex');
            $('.regions__russia').css('display', 'block');
            $('.regions__help').css('display', 'none');
        }
    });

    $('.regions__search').find('form').on('submit', function (e) {
        e.preventDefault();
    });

    // cookie
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function setCookie(name, value, options) {
        options = options || {};

        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

    function deleteCookie(name) {
        setCookie(name, "", {
            expires: -1
        })
    }

    /*if (getCookie('regionCur') == undefined) {
      $('.hint-region-ask').addClass('active');
    } else {
      $('.hint-region__text').text(getCookie('regionCur'));
    }
    $('.hint-region-ask__btn').on('click', function (e) {
      let elIndex = $(this).index();
      if (elIndex == 1) {
        setCookie('regionCur', 'Алтайский край', {
          expires: '86400‬00',
          path: '/',
          domain: window.location.hostname,
        });
        $('.hint-region__text').text(getCookie('regionCur'));
        $('.hint-region-ask').removeClass('active');
      } else {
        $('body').addClass('regions-active');
      }
    });*/

    $('.page-nav__location').on('mouseenter', function (e) {
        e.preventDefault();
        $('.hint-region').addClass('active');
    });

    $('.page-nav__location').on('mouseout', function (e) {
        e.preventDefault();
        if ($(e.relatedTarget).hasClass('page-nav__bot-main') || $(e.relatedTarget).hasClass('page-nav') || $(e.relatedTarget).hasClass('page-nav__bot')) {
            $('.hint-region').removeClass('active');
        }
    });

    $('.regions__russia-item_child,.regions__country-item').on('click', function (e) {
        let elName = $(this).text();
        setCookie('regionCur', elName, {
            expires: '86400‬00',
            path: '/',
            domain: window.location.hostname,
        });
        $('.hint-region__text').text(getCookie('regionCur'));
        $('body').removeClass('regions-active');
        $('.hint-region-ask').removeClass('active');
    });

    $.fn.select2.defaults.set("width", "100%");
    $('.js-select').select2({
        minimumResultsForSearch: Infinity,
        theme: 'almaz'
    });
    $('.js-select-search').select2({
        theme: 'almaz',
        "language": {
            "noResults": function () {
                return "Не найдено";
            }
        },
    });

    $('.field input, .field textarea').focus(function () {
        $(this).parents('.field').addClass('focused');
    });

    $('.field input, .field textarea').blur(function () {
        let inputValue = $(this).val();
        if (inputValue === "") {
            $(this).parents('.field').removeClass('focused');
        }
    });

    let imDate = new Inputmask({
        mask: "99.99.9999",
        showMaskOnHover: false
    });
    imDate.mask ('.js-datepicker');
    $('.js-datepicker').datepicker();


    $('.js-lk-buyer-add').on('click', function () {
        const $wrap = $(this).parents('.js-lk-buyer-add-wrap');
        const $buyersBlock = $('.js-lk-buyer-block');

        $wrap.slideUp(500, () => {
            $wrap.addClass('hide');
        });

        $buyersBlock.slideDown(500, () => {
            $buyersBlock.removeClass('hide');
            $buyersBlock.find('input').attr('required', true);
            $('.js-select-buyer').attr('required', false);
        });
    });

    const fadeNewBuyer = function () {
        const $wrap = $('.js-lk-buyer-add-wrap');
        const $buyersBlock = $('.js-lk-buyer-block');

        $wrap.slideDown(500, () => {
            $wrap.removeClass('hide');
            $wrap.css('display', 'flex');
        });

        $buyersBlock.slideUp(500, () => {
            $buyersBlock.addClass('hide');
            const $inputs = $buyersBlock.find('input');
            $inputs.val('');
            $inputs.attr('required', false);
            $('.js-select-buyer').attr('required', true);
        });
    };

    $('.js-lk-buyer-remove').on('click', fadeNewBuyer);
    $('.js-select-buyer').on('change', fadeNewBuyer);

    $('.first__tab').on('click', function (e) {
        e.preventDefault();
        let elIndex = $(this).index();
        let dataTab = $('[data-tab]').eq(elIndex);

        $('.first__tab').removeClass('current');
        $(this).addClass('current');

        if (elIndex != 0) {
            window.scrollToPos($(dataTab).offset().top - 120);
        } else {
            window.scrollToPos(0);
        }
    });

    $(window).on('scroll', function (e) {
        let docScroll = $('body,html').scrollTop();
        let dataTab = $('[data-tab]')
        dataTab.each(function (i, item) {
            if ($(item).offset().top - 125 < docScroll && docScroll < ($(item).offset().top + $(item).height())) {
                $('.first__tab').removeClass('current');
                $('.first__tab').eq(i).addClass('current');
            }
        });

        if (dataTab.last().offset()) {
            if (dataTab.last().offset().top < docScroll) {
                $('.first__tabs').addClass('close');
            } else {
                $('.first__tabs').removeClass('close');
            }
        }

    });

    $('.js-select-linked').on('change', (e) => {
        const $el = $(e.target);
        const path = $el.data('path');
        const $linkedNode = $($el.data('linked'));


        $.ajax({
            url: path,
            method: "post",
            data: {
                sign: $el.val()
            },
            dataType: 'json',

            success: function (response) {
                if (response.success === 1) {
                    $linkedNode.find('option:not([hidden])').remove();
                    $linkedNode.val(0);

                    $.each(response.data.DATA, (index, value) => {
                        $linkedNode.append(`<option value="${value['ID']}">${value['NAME']}</option>`)
                    });
                }
            }
        });
    });


});