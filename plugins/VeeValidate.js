import Vue from 'vue';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: 'El campo es requerido'
});

extend('email', {
    ...email,
    message: 'El campo no es un correo electronico'
})

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);