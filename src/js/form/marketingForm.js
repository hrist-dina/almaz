import {BaseForm} from "../base-form";
import "jquery-validation";
import {BaseModal} from "../base-modal";


export default class MarketingForm extends BaseForm {
    init() {
        this.validate();
        const filesExt = ['jpg', 'png' , "jpeg", "pdf"]; // массив расширений
        const $fileInput = $('.js-file-mark');

        $fileInput.each(function (i, elem) {
                console.log($(elem).val());
            var type_file = $(elem).data('type');
            $(elem).change(function(){
                let parts = $(this).val().split('.');
                if(type_file.search(parts[parts.length - 1]) == -1){
                    let modal = BaseModal.openModal('result');
                    BaseModal.renderMessage(modal, 'Вы загрузили изображение неправильного формата. Поддерживаются '+type_file+'.');
                    $fileInput.val();
                }
            });
        });
    }

    submitFunction(form) {
        const $form = this.$element;
        let formData = new FormData($form.get(0));

        $.ajax({
            url: $form.attr('action'),
            method: "post",
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false,

            success: (response) => {
                if (response.success === 1) {
                    $form.trigger('reset');
                    let modal = BaseModal.openModal('result');
                    BaseModal.renderMessage(modal, 'Действие совершено успешно');
                    console.log('форма отправлена');
                    $form.find('.mess').text('');
                }else{
                    $form.find('.mess').text(response.error).css('color', 'red');
                }
            }
        });
    }
}

