import $ from 'jquery';

export class Loader {
    constructor(selector = '.js-cube-loader') {
        this.element = $(document).find(selector);
    }

    show() {
        $(this.element).fadeIn();
    }

    hide() {
        $(this.element).fadeOut();
    }
}