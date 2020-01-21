import {BaseForm} from "../base-form";
import "jquery-validation";
import {BaseModal} from "../base-modal";


export default class MarketingForm extends BaseForm {
    init() {
        this.validate();
    }

    submitFunction(form, loader) {
        if (this.beforeSubmit()) {
            return;
        }
        const $form = this.$element;
        let formData = new FormData($form.get(0));
        loader.show();
        $.ajax({
            url: $form.attr('action'),
            method: "post",
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false,

            success: (response) => {
                if (response.success === 1) {
                    if(response.data.edit_fild && response.data.type){
                        switch (response.data.type) {
                            case 'text':
                                $(document).find('#'+response.data.edit_fild).text(response.data.value);
                                break;
                        }
                    }else{
                        $form.trigger('reset');
                        let modal = BaseModal.openModal('result');
                        if(response.data.file){
                            BaseModal.renderMessage(modal, 'Файл сформирован');
                            $(modal).find('.js-link-href').text('Скачать').attr('href', response.data.file).attr("download","Report.xlsx");
                        }else {
                            BaseModal.renderMessage(modal, 'Действие совершено успешно');
                        }
                    }
                    $form.find('.mess').text('');
                }else{
                    $form.find('.mess').text(response.error).css('color', 'red');
                }
                loader.hide();
            }
        });
    }
}

