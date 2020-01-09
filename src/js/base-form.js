import "jquery-validation";
import "jquery-mask-plugin";

// import autosize from "autosize/src/autosize";

class BaseForm {
    constructor(element, loader) {
        this.$element = $(element);
        this.loader = loader;

        this.$element.find('.js-submit').on('click', () => {
            this.$element.trigger('submit');
        });

        // this.$element.find('.js-tel').mask('+7 (000) 000-00-00');

        this.init();
    }

    validate() {
        const $form = this.$element;
        const loader = this.loader;
        const self = this;

        $.validator.addMethod('checkPhone', function (value, element) {
            return /\+\d{1} \(\d{3}\) \d{3}-\d{4}/g.test(value);
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
                    console.log(element);
                    $(element).closest('.js-field').addClass('error').find('.js-error-tooltip').fadeIn();
                    self.beforeSubmit();
                    return true;
            },
            success: function (element) {
                $(element).closest('.js-field').removeClass('error').find('.js-error-tooltip').fadeOut();
                return true;
            },
            highlight: function (element) {
                $(element).closest('.js-field').addClass('error').find('.js-error-tooltip').fadeIn();
            },
            unhighlight: function (element) {
                $(element).closest('.js-field').removeClass('error').find('.js-error-tooltip').fadeOut();
            },
            lang: 'ru',
            invalidHandler: function (form) {
                // const modal = $(".modal[data-modal='error']");
                // modal.iziModal('open');
            },
            submitHandler: (form) => {
                this.submitFunction(form, loader);
            },
        });


        $form.find('.name').rules("add", {
            minlength: 2,
        });

        $form.find('.email').rules("add", {
            minlength: 3
        });

        $form.find('.js-inn').rules("add", {
            minlength: 10,
            maxlength: 14,
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

        $form.find('.js-file').rules("add", {
            accept: "jpg,png,jpeg,gif"
        });

        if ($form.find('.js-file-mark').length > 0) {
            $form.find('.js-file-mark').each(function (i, elem) {
                var type_file = $(elem).data('type');
                $(elem).find('.js-file-mark').rules("add", {
                    accept: type_file
                });
            });
        }

        $.validator.setDefaults({ignore: ".ignore"});


        // $form.find('.required').rules("add", {
        //     required: true,
        // });


    }

    beforeSubmit() {
        let fileInput = this.$element.find('input[type="file"]:required');
        let error = [];
        fileInput.each((i, el) => {
            let field = $(el).closest('.js-field');
            if($(el).val() === '' && $(el).closest('.lk__form-file').find('[data-editfile]').length <= 0) {
                field.addClass('error');
                error.push(true);
            } else {
                field.removeClass('error');
                error.push(false);
            }
        });
        return !!error.filter((el) => el).length;
    }

    submitFunction(form) {
        //
    }

    init() {
        //
    }
}

export {BaseForm};