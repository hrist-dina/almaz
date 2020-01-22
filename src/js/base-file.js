import $ from 'jquery';
import {BaseModal} from "./base-modal";

class BaseFile {
    constructor(selector = '.js-file') {
        this.selector = selector;
        this.filesExtDef = 'jpg, png, jpeg, pdf';

        this.init();
    }

    init() {
        this.onChange();
    }

    onChange() {
        const self = this;
        $(this.selector).each((i, elem) => {
            const typeFile = $(elem).data('type') || self.filesExtDef;
            $(elem).change(function() {
                let parts = $(this).val().split('.');
                if(typeFile.search(parts[parts.length - 1]) === -1){
                    let modal = BaseModal.openModal('result');
                    BaseModal.setCloseOnOk(modal);
                    BaseModal.renderMessage(modal, 'Ошибка', `Вы загрузили изображение неправильного формата. Поддерживаются ${typeFile}.`);
                    $(this).val('');
                }
            });
        });
    }
}

export {BaseFile};