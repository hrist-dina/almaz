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
    }

    clickTab() {
        const self = this;
        this.nav.children().on('click', function () {
            self.nav.children().removeClass(self.activeClass);
            $(this).addClass(self.activeClass);
            const type = $(this).data('tab');
            self.content.children().each((index, item) => {
                if ($(item).data('tab-content') === type) {
                    $(item).addClass(self.activeClass);
                } else {
                    $(item).removeClass(self.activeClass);
                }
            });
        });
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
