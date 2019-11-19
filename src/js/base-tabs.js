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
        this.showFrom.on('click', () => {
            this.from.addClass(this.activeClass);
            this.contentInner.removeClass(this.activeClass);
        });
    }

    clickBack() {
        this.back.on('click', () => {
            this.from.removeClass(this.activeClass);
            this.contentInner.addClass(this.activeClass);
        });
    }
}

export {BaseTabs};
