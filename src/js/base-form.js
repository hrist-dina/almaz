import "jquery-validation";
// import autosize from "autosize/src/autosize";

class BaseForm {
    constructor(element) {
        this.$element = $(element);

        this.$element.find('.js-submit').on('click', () => {
            this.$element.trigger('submit');
        });

        this.init();
    }

    validate() {
        const $form = this.$element;

        $.validator.addMethod('checkPhone', function (value, element) {
            return /\+\d{1} \(\d{3}\) \d{3}-\d{2}-\d{2}/g.test(value);
        });

        $.extend($.validator.messages, {
            checkPhone: 'Введите правильный номер телефона.',
            required: 'Это поле необходимо заполнить.',
            remote: 'Пожалуйста, введите правильное значение.',
            email: 'Пожалуйста, введите корректный email.',
            url: 'Пожалуйста, введите корректный URL.',
            date: 'Пожалуйста, введите корректную дату.',
            dateISO: 'Пожалуйста, введите корректную дату в формате ISO.',
            number: 'Пожалуйста, введите число.',
            digits: 'Пожалуйста, вводите только цифры.',
            creditcard: 'Пожалуйста, введите правильный номер кредитной карты.',
            equalTo: 'Пожалуйста, введите такое же значение ещё раз.',
            extension: 'Пожалуйста, выберите файл с расширением jpeg, pdf, doc, docx.',
            maxlength: $.validator.format(
                'Пожалуйста, введите не больше {0} символов.'),
            minlength: $.validator.format(
                'Пожалуйста, введите не меньше {0} символов.'),
            rangelength: $.validator.format(
                'Пожалуйста, введите значение длиной от {0} до {1} символов.'),
            range: $.validator.format('Пожалуйста, введите число от {0} до {1}.'),
            max: $.validator.format(
                'Пожалуйста, введите число, меньшее или равное {0}.'),
            min: $.validator.format(
                'Пожалуйста, введите число, большее или равное {0}.'),
            maxsize: 'Максимальный размер файла - 5мб',
        });

        $form.validate({
            errorPlacement: function (error, element) {
                $(element).closest('.js-field').addClass('error').find('.js-error-tooltip').fadeIn();

                return true;
            },
            success: function (element) {
                $(element).closest('.js-field').removeClass('error').find('.js-error-tooltip').fadeOut();

                return true;
            },
            highlight: function(element) {
                $(element).closest('.js-field').addClass('error').find('.js-error-tooltip').fadeIn();
            },
            unhighlight: function(element) {
                $(element).closest('.js-field').removeClass('error').find('.js-error-tooltip').fadeOut();
            },
            lang: 'ru',
            invalidHandler: function (form) {
                // const modal = $(".modal[data-modal='error']");
                // modal.iziModal('open');
            },
            submitHandler: (form) => {
                this.submitFunction(form);
            },
        });


        $form.find('.name').rules("add", {
            minlength: 2,
        });

        $form.find('.email').rules("add", {
            minlength: 3
        });

        $form.find('.tel').rules("add", {
            minlength: 17,
            checkPhone: true
        });
        $form.find('.js-number').rules("add", {
            minlength: 5,
            maxlength: 6,
            number: true
        });


        $.validator.setDefaults({ignore: ".ignore"});


        // $form.find('.required').rules("add", {
        //     required: true,
        // });


    }

    submitFunction(form) {
        //
    }

    init() {
        //
    }
}

export {BaseForm};