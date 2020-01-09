import $ from "jquery";
import {BaseSelect} from "./base-select";

const selectorBase = ".js-lk";

class BaseLk {
    constructor(selector = selectorBase) {
        this.selector = selector;
        this.rowAdd = $(`${selector}-row-add`);
        this.nameRadioGroup = '';
        this.countRadioGroup = 1;

        this.radio = `${selector}-radio`;
        this.radioBtn = `${this.radio}-btn`;

        this.tag = `${selector}-tag`;
        this.tagList = `${this.tag}-list`;
        this.tagWrap = `${this.tag}-wrap`;
        this.tagEmpty = `${this.tag}-empty`;
        this.tagDelete = `${this.tag}-delete`;
        this.tagSelect = `${this.tag}-select`;
        this.tagSelectBtn = `${this.tagSelect}-btn`;

        this.formBox = `${selector}-form-box`;
        this.formBoxShow = `${this.formBox}-show`;
        this.formBoxHide = `${this.formBox}-hide`;

        this.init();
    }

    init() {
        this.clickRowAdd();
        this.changeRadio();
        this.initField();
        this.initInputFile();
        this.clickOnSelectBtn();
        this.clickOnTagDelete();
        this.clickOnFormBoxShow();
        this.clickOnFormBoxHide();
    }

    toggleFormBox(element) {
        let parent = $(element).parents(this.formBox);
        parent.removeClass('active');
        parent.siblings(this.formBox).filter((item) => {
            return !$(item).hasClass('active');
        }).addClass('active');
        if($(element).data('req') == 'Y'){
            parent.find('.lk__form-field').removeClass('required');
            parent.find('.select').removeClass('required');
            parent.find('.field__title').removeClass('.field__required');
            parent.find('.field__input').removeAttr('required');

            parent.siblings(this.formBox).find('.lk__form-field').addClass('required');
            parent.siblings(this.formBox).find('.select').addClass('required');
            parent.siblings(this.formBox).find('.field__title').addClass('field__required');
            parent.siblings(this.formBox).find('.field__input').attr('required', 'required');
        }
    }

    clickOnFormBoxShow() {
        const self = this;
        $(this.formBoxShow).on('click', function () {
            self.toggleFormBox(this);
        });
    }

    clickOnFormBoxHide() {
        const self = this;
        $(this.formBoxHide).on('click', function () {
            self.toggleFormBox(this);
        });
    }


    clickOnSelectBtn() {
        const self = this;
        $(this.tagSelectBtn).on('click', function () {

            const select = $(this).siblings(`${self.tagSelect}`).find(':selected');
            const valueSelect = select.val();
            const textSelect = select.text();
            if (!valueSelect) return;

            let list = $(self.tagList);
            const nameTag = list.data('name') || 'tags[]';

            const hasTags = list.find(`${self.tag} input[value=${valueSelect}]`);
            if (hasTags.length) return;

            let tag = self.getTagTemplate(textSelect, valueSelect, nameTag);
            list.append(tag);

            if (list.find(self.tag).length) {
                let wrap = list.parent(self.tagWrap);
                wrap.addClass('active');
                wrap.siblings(self.tagEmpty).removeClass('active');
            }
        });
    }

    clickOnTagDelete() {
        const self = this;
        $(document).on('click', this.tagDelete, function () {
            $(this).parent(self.tag).remove();

            let list = $(self.tagList);
            if (!list.find(self.tag).length) {
                let wrap = list.parent(self.tagWrap);
                wrap.removeClass('active');
                wrap.siblings(self.tagEmpty).addClass('active');
            }
        });
    }

    getTagTemplate(text, value, name) {
        const classDelete = this.tagDelete.slice(1);
        const classTag = this.tag.slice(1);
        return (
            `<li class="${classTag}">
                <span>${text}</span>
                <i class="${classDelete}"></i>
                <input type="hidden" name="${name}" value="${value}">
            </li>`
        );
    }

    clickRowAdd() {
        const self = this;
        this.rowAdd.on('click', function () {
            const thisRow = $(this).parent();
            const prevRow = thisRow.prev();
            const clone = thisRow.prev().clone();
            if(clone.find('label.field').find('input').length > 0){
                clone.find('label.field').find('input').val('');
            }
            clone.find('.select2').remove();
            const radio = clone.find('input[type=radio]');

            if (!self.nameRadioGroup) {
                self.nameRadioGroup = radio.attr('name');
            }
            radio.attr('name', `${self.nameRadioGroup}-${self.countRadioGroup}`);
            self.countRadioGroup++;
            clone.insertAfter(prevRow);
            clone.find('.selected .field-file > span').trigger('click');
            new BaseSelect();
            self.initField();
            self.initInputFile();
        });
    }

    changeRadio() {
        const self = this;
        $(document).on('change', this.radioBtn, function () {
            const radio = $(this);
            const val = radio.val();
            const row = radio.parents(self.radio).find(`[data-radio-type="${val}"]`);
            row.siblings().addClass('hide');
            row.removeClass('hide');
            if(radio.data('req') == 'Y'){
                row.find('.lk__form-field').addClass('required');
                row.find('.field__title').addClass('field__required');
                row.find('.field__input').attr('required', 'required');

                row.siblings().removeClass('error');
                row.siblings().find('.lk__form-field').removeClass('required');
                row.siblings().find('.field__title').removeClass('field__required');
                row.siblings().find('.field__input').removeAttr('required');
            }
        });
    }

    initField() {
        $('.field input, .field textarea').focus(function () {
            $(this).parents('.field').addClass('focused');
        });

        $('.field input, .field textarea').blur(function () {
            let inputValue = $(this).val();
            if (inputValue === "") {
                $(this).parents('.field').removeClass('focused');
            }
        });
    }

    initInputFile() {
        $(document).on('change', '.field-file input[type=file]', function() {
            let fileName = $(this).val().split('\\').pop();
            let label =
                $(this)
                    .parent('.field-file')
                    .siblings('.lk__download')
                    .find('.lk__download-title');

            let parent = label.parents('.lk__form-file');
            let span = $(this).siblings('span');

            if (label.data('default-title') === undefined) {
                label.attr('data-default-title', label.html().trim());
                span.attr('data-default-title', span.html().trim());
            }

            if (fileName === '') {
                parent.removeClass("selected");
                label.html(label.data('default-title'));
                span.html(span.data('default-title'));
            } else {
                parent.addClass('selected');
                label.html(fileName);
                span.text('Удалить файл');
            }
        });

        $(document).on('click', '.selected .field-file > span', function(e) {
            e.preventDefault();
            $(this).siblings('input[type=file]').val('').trigger('change');
            if($(this).closest('.lk__form-file').find('[data-editfile]').length > 0 && $(this).closest('.lk__form-file').find('[data-editfile]').val()){
                $(this).closest('.lk__form-file').find('[data-editfile]').remove();
            }
        });
    }
}

export {BaseLk};
