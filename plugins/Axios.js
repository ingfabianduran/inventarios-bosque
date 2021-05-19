import Errors from '~/components/Site/Errors';

export default function ({ $axios, redirect, store }, inject) {
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 422) {
      const errors = error.response.data;
      Errors.showError(errors);
      return true;
    } else if (code === 503 || code === 404 || code === 400) {
      const errors = error.response.data;
      Errors.showError(errors);
    } else if (code === 401) {
      const message = error.response.data.error;
      store.commit('setMessage', message);
      redirect('/');
    } else if (code === 403) {
      const message = error.response.data.descripcion;
      store.commit('set', message);
      redirect('/');
    } else if (code === 500) {
      const message = { codigo: 500, message: 'Opss!!! algo no esta bien por aca' };
      Errors.showError(message);
    }
  });
}
