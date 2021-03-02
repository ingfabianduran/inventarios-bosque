import Alert from '~/components/Site/SweetAlert';

export default function ({ $axios }) {  
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 422) {
      Alert.showToast('error', 'Datos invalidos para el servidor');
      return true;
    }
  });
}