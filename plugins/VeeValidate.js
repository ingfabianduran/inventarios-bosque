import Vue from 'vue';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, email, min, max, integer, min_value, max_value, oneOf, confirmed, alpha } from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: 'El campo {_field_} es requerido'
});

extend('email', {
    ...email,
    message: 'El campo {_field_} no es un correo electronico'
});

extend('min', {
    ...min,
    message: 'El campo {_field_} tiene menos de {length} caracteres'
});

extend('max', {
    ...max,
    message: 'El campo {_field_} tiene mas de {length} caracteres'
});

extend('integer', {
    ...integer,
    message: 'El campo {_field_} no es un numero entero'
});

extend('min_value', {
    ...min_value,
    message: 'El valor del campo {_field_} debe ser mayor a {min}'
});

extend('max_value', {
    ...max_value,
    message: 'El valor del campo {_field_} debe ser menor a {max}'
});

extend('oneOf', {
    ...oneOf,
    message: 'El valor del campo {_field_} es invalido'
});

extend('confirmed', {
    ...confirmed,
    message: 'Confirmar el valor del campo {_field_}'
});

extend('alpha', {
  ...alpha,
  message: 'El valor del campo {_field_} no debe contener caracteres especiales'
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
