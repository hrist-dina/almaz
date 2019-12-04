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

        this.init();
    }

    init() {
        this.clickRowAdd();
        this.changeRadio();
        this.initField();
        this.clickOnSelectBtn();
        this.clickOnTagDelete();
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
            clone.find('.select2').remove();
            const radio = clone.find('input[type=radio]');

            if (!self.nameRadioGroup) {
                self.nameRadioGroup = radio.attr('name');
            }
            radio.attr('name', `${self.nameRadioGroup}-${self.countRadioGroup}`);
            self.countRadioGroup++;
            clone.insertAfter(prevRow);
            new BaseSelect();
            self.initField();
        });
    }

    changeRadio() {
        const self = this;
        $(document).on('change', this.radioBtn, function () {
            const val = $(this).val();
            const row = $(this).parents(self.radio).find(`[data-radio-type="${val}"]`);
            row.siblings().addClass('hide');
            row.removeClass('hide');
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
}

export {BaseLk};
