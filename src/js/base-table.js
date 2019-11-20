import $ from "jquery";

const selectorBase = ".js-table";

class BaseTable {

    constructor(selector = selectorBase) {
        this.selector = selector;
        this.detail = `${selector}-detail`;
        this.link = $(`${this.detail}-link`);
        this.data = `${this.detail}-data`;

        this.init();
    }

    init() {
        this.clickLink();
    }

    clickLink() {
        const self = this;
        this.link.on('click', function () {
            console.log('test');
            const showText = $(this).data('show-text');
            const oldText = $(this).text();
            let links = $(this).parents(self.detail).find(self.link);
            links.text(showText);
            links.data('show-text', oldText);

            $(this).parents(self.detail).find(self.data).slideToggle();
        });
    }
}

export { BaseTable };
