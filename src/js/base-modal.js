import $ from "jquery";
import iziModal from "izimodal-1.6.0";
// Initialise imported function as jQuery function
$.fn.iziModal = iziModal;

const selectorBase = ".js-modal";

class BaseModal {

    constructor(selector = selectorBase, options = {}) {
        this.selector = selector;
        this.element = $(document).find(this.selector);
        this.selectorOpen = `${selector}-open`;
        this.selectorClose = `${selector}-close`;
        this.options = $.extend(BaseModal.baseOptions(), options, {
            onClosed: this.eventOnClosed
        });
        this.init();
    }

    static baseOptions() {
        return {
            radius: 0,
            width: "auto",
            borderBottom: false,
            closeButton: false,
            focusInput: false
        };
    }

    static closeCurrent(elem) {
        $(elem).iziModal("close");
    }

    static openModal(type) {
        $(selectorBase)
            .filter(function () {
                return $(this).data("modal-type") === type;
            })
            .iziModal("open");
        return $(selectorBase);
    }

    static renderMessage(modal, message, text= false) {
        const textElem = $(modal).find('.js-modal-text');
        textElem.html($("<div>", {class: "popup__title"}).html(message));
        if (text) {
            textElem.append($("<div>", {class: "popup__text"}).html(text));
        }
    }

    static clear(element) {
        $(element)
            .find("input")
            .filter(":text, :password, :file")
            .val("")
            .end()
            .filter(":checkbox, :radio")
            .removeAttr("checked")
            .end()
            .end()
            .find("textarea")
            .val("")
            .end()
            .find("select")
            .prop("selectedIndex", 0)
            .find("option:selected")
            .removeAttr("selected")
            .end()
            .find("button[type=submit]")
            .prop("disabled", false);
        return this;
    }

    init() {
        if (this.element.length) {
            this.element.iziModal(this.options);
            this.onClick();
        }
    }

    onClick() {
        const self = this;

        $(document)
            .find(this.selectorOpen)
            .on("click", function (event) {
                event.preventDefault();
                self.close();
                self.open($(this).data("modal-type"), $(this).data('modal-success-url-button'));
            });
        $(this.selectorClose).on("click", function (event) {
            event.preventDefault();
            self.close();
        });
    }

    open(type, successUrl = null) {
        this.element
            .filter(function () {
                return $(this).data("modal-type") === type;
            })
            .map(function (index, item) {
                if (successUrl) {
                    return $(item).attr('data-modal-success-url', successUrl);
                } else {
                    return item;
                }
            })
            .iziModal("open");
    }

    close() {
        this.element.map((item, elem) => {
            $(elem).iziModal("close");
            BaseModal.clear(elem);
        });
    }

    eventOnClosed(data){
        const url = $(data.$element).data('modal-success-url');
        if (url) {
            window.location.href = url;
        }
    }
}

export {BaseModal};
