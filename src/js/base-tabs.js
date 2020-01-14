import $ from "jquery";

const selectorBase = ".js-tabs";

class BaseTabs {

    constructor(selector = selectorBase) {
        this.selector = selector;
        this.nav = $(`${selector}-nav`);
        this.content = $(`${selector}-content`);
        this.contentInner = $(`${selector}-content-inner`);

        this.select = $(`${selector}-select`);
        this.selectContent = $(`${selector}-select-content`);

        this.showFrom = $(`${selector}-show-form`);
        this.from = $(`${selector}-form`);
        this.back = $(`${selector}-back`);

        this.activeClass = 'active';
        this.init();
    }

    init() {
        this.clickTab();
        this.clickShowForm();
        this.clickBack();
        this.clickMobileSelect();
        this.onLoad();
        this.onChangeSelect();
    }

    clickMobileSelect() {
        this.nav.on('click', function () {
            $(this).toggleClass('is-open');
        });
    }

    onChangeSelect() {
        const self = this;
        this.select.on('change', function () {
            const type  = $(this).val();
            let content = $(this).parents('form').find(self.selectContent);
            content.children('fieldset').map(function (index,item) {
                let fieldset = $(item).data('form-fieldset');
                if (fieldset.toString() === type.toString()) {
                    $(item).prop('disabled', false);
                    if($(item).find("[data-req]").length > 0){
                        $(item).find("[data-req]").each(function (i, elem) {
                            if($(elem).data('req') == 'Y'){
                                $(elem).find('div.lk__form-field').addClass('required');
                                $(elem).find('div.lk__download-title').addClass('field__required');
                                $(elem).find('input.field-file__input').attr('required', 'required');
                            }
                        });
                    }
                } else {
                    $(item).prop('disabled', true);
                    if($(item).find("[data-req]").length > 0){
                        $(item).find("[data-req]").each(function (i, elem) {
                            if($(elem).data('req') == 'Y'){
                                $(elem).find('div.lk__form-field').removeClass('required');
                                $(elem).find('div.lk__download-title').removeClass('field__required');
                                $(elem).find('input.field-file__input').removeAttr('required');
                            }
                        });
                    }
                }
            });
        });
    }

    clickTab() {
        const self = this;
        this.nav.children().on('click', function () {
            const type = $(this).data('tab');
            window.location.hash = type;
            self.openTab(type);
        });
    }

    openTab(type) {
        this.content.children().each((index, item) => {
            if ($(item).data('tab-content') === type) {
                $(item).addClass(this.activeClass);
            } else {
                $(item).removeClass(this.activeClass);
            }
        });

        this.nav.children().each((index, item) => {
            if ($(item).data('tab') === type) {
                $(item).addClass(this.activeClass);
            } else {
                $(item).removeClass(this.activeClass);
            }
        });
    }

    onLoad() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            this.openTab(hash);
        }
    }

    clickShowForm() {
        const self = this;
        this.showFrom.on('click', function() {
            $(this).addClass('hide');
            const tab = $(this).parents('[data-tab-content]');
            tab.find(self.from).addClass(self.activeClass);
            tab.find(self.contentInner).removeClass(self.activeClass);
        });
    }

    clickBack() {
        const self = this;
        this.back.on('click', function() {
            self.showFrom.removeClass('hide');
            const tab = $(this).parents('[data-tab-content]');
            tab.find(self.from).removeClass(self.activeClass);
            tab.find(self.contentInner).addClass(self.activeClass);
        });
    }
}

export {BaseTabs};
