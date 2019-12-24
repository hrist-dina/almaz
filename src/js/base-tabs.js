import $ from "jquery";

const selectorBase = ".js-tabs";

class BaseTabs {

    constructor(selector = selectorBase) {
        this.selector = selector;
        this.nav = $(`${selector}-nav`);
        this.content = $(`${selector}-content`);
        this.contentInner = $(`${selector}-content-inner`);

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
    }

    clickMobileSelect() {
        this.nav.on('click', function () {
            $(this).toggleClass('is-open');
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
