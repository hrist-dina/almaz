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

        this.init();
    }

    init() {
        this.clickRowAdd();
        this.changeRadio();
        this.initField();
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
