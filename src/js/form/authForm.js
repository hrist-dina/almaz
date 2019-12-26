import {BaseForm} from "../base-form";
import "jquery-validation";
import {BaseModal} from "../base-modal";

export default class AuthForm extends BaseForm {
    init() {
        this.validate();
    }

    submitFunction(form, loader) {
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
                    window.location.replace($form.data('redirect'));

                } else {
                    let modal = BaseModal.openModal('result');
                    BaseModal.renderMessage(modal, response.error);
                }
                loader.hide();
            }
        });
    }
}

