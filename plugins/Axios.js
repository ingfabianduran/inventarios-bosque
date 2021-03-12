import Errors from '~/components/Site/Errors';

export default function ({ $axios }) {
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 422) {
      const errors = error.response.data;
      Errors.showErrors422(errors);
      return true;
    } else if (code === 503) {
      const errors = error.response.data;
      Errors.showErrors503(errors);
    } else if (code === 404) {
      const errors = error.response.data;
      Errors.showErrors404(errors);
    }
  });
}
