import $ from "jquery";
import select2 from "select2";
$.fn.select2.defaults.set("width", "100%");

const selectorBase = ".js-select";

class BaseSelect {
    constructor(selector = selectorBase) {
        this.selector = selector;

        this.theme = 'almaz';
        this.init();
    }

    init() {
        this.initSelect();
        this.initSelectSearch();
    }

    initSelect() {

        $(this.selector).select2({
            minimumResultsForSearch: Infinity,
            theme: this.theme
        });
    }

    initSelectSearch() {
        $(`${this.selector}-search`).select2({
            theme: this.theme,
            "language": {
                "noResults": function () {
                    return "Не найдено";
                }
            },
        });
    }
}

export {BaseSelect};
