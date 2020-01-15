import $ from "jquery";

const selectorBase = ".js-autocomplete";

class BaseAutocomplete {

    constructor(
        selector = selectorBase,
        hiddenInput = `${selectorBase}-hidden-input`,
        textElement = `${selectorBase}-text`,
        textForEmpty = 'Данные не найдены'
    ) {
        this.selector = selector;
        this.hiddenInput = hiddenInput;
        this.textElement = textElement;
        this.textForEmpty = textForEmpty;
        this.suggests = `${selectorBase}-suggests`;
        this.textOnSaved = '';

        this.init();
    }

    init() {
        this.onLoad();
        this.onClick();
        this.onInput();
    }

    onLoad() {
        let boxElem = this.getBoxElement($(document).find(this.selector));
        if (boxElem) {
            this.textOnSaved = $(boxElem).find(this.textElement).text();
        }
    }

    onClick() {
        const self = this;
        $(document).on('click', `${this.suggests} li`, function (e) {
            const $el = $(e.target);

            const number = self.setData($el);

            let suggests = $el.closest(self.suggests);
            if (number) {
                const toInput = number.toString().replace(/<[^>]+>/g, '');
                suggests.siblings('label').find(self.selector.toString).val(toInput).trigger('focus');
            }
            suggests.remove();
        });
    }

    onInput() {
        const self = this;
        $(document).on('input', this.selector, function (e) {
            const $el = $(e.target);
            const path = $el.data('path');
            const minLen = $el.data('min-len') || 3;
            if ($el.val().length < minLen) {
                self.removeSuggests($el);
                return;
            }
            $.ajax({
                url: path,
                method: "post",
                data: {
                    number: $el.val()
                },
                dataType: 'json',
                success: function (response) {
                    if (response.success) {
                        self.setSuggests($el, response.data.DATA);
                    }
                },
                error(err) {
                    // TODO:: для отладки, удалить после добавления на бэк
                    console.log(err);
                    let data = [
                        {id: 1, number: '123123121', type: 'test-test', model: 'modeltest'},
                        {
                            id: 2,
                            number: '123123122',
                            type: 'test-test test-test test-test',
                            model: 'modeltest modeltest modeltest modeltest modeltest'
                        },
                        {id: 3, number: '123123123', type: 'test-test', model: 'modeltest'},
                        {id: 4, number: '123123124', type: 'test-test', model: 'modeltest'},
                        {id: 5, number: '123123124', type: 'test-test', model: 'modeltest'},
                        {id: 6, number: '123123124', type: 'test-test', model: 'modeltest'},
                    ];

                    if ($el.val().length % 2) {
                        data = [];
                    }
                    self.setSuggests($el, data);
                }
            });
        });
    }

    renderSuggests(dataArray) {
        let ul = $(`<ul class="lk__form-field-suggests ${this.suggests.slice(1)}">`);

        if (!dataArray.length) {
            ul.append(`<span>${this.textForEmpty}</span>`);
            return ul;
        }
        dataArray.map(data => {
            const id = data.id;
            const number = data.number;
            const type = data.type;
            const model = data.model;
            ul.append(
                `<li 
                    data-id="${id}"
                    data-number="${number}"
                    data-type="${type}"
                    data-model="${model}"
                >${this.renderSuggestText(number, type, model)}</li>
            `);
        });
        return ul;
    }

    renderSuggestText(number, type, model) {
        return `<b>${number}</b> ${type} ${model}`;
    }

    removeSuggests(el) {
        let suggests = el.closest('label').siblings(this.suggests);
        if (suggests) {
            suggests.remove();
            this.setData(el, true);
        }
    }

    setSuggests(el, data) {
        let label = el.closest('label');
        this.removeSuggests(el);
        label.after(this.renderSuggests(data));
    }

    getBoxElement(el) {
        let box = el.closest('.lk__form-box');
        let boxWrap = el.closest('.lk__form-box-wrap');
        return box.length > 0 ? box : boxWrap.length > 0 ? boxWrap : false;
    }

    setData($el, isClean = false) {

        const id = isClean ? '' : $el.data('id');
        const number = isClean ? '' : $el.data('number');
        const type = $el.data('type');
        const model = $el.data('model');

        let dataText = isClean ? this.textOnSaved : `${type} ${model}`;

        let boxElem = this.getBoxElement($el);

        if (!boxElem) {
            return;
        }
        boxElem.find(this.textElement).html(dataText);
        boxElem.find(this.hiddenInput).val(id);

        return number;
    }
}

export {BaseAutocomplete};
