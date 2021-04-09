import Errors from '~/components/Site/Errors';

export default function ({ $axios }) {
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 422) {
      const errors = error.response.data;
      Errors.showError(errors);
      return true;
    } else if (code === 503 || code === 404 || code === 400 || code === 401) {
      const errors = error.response.data;
      Errors.showError(errors);
    }
  });
}
