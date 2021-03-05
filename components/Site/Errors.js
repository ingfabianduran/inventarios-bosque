import Alert from '~/components/Site/SweetAlert';

export default {
  showErrors422(errors) {
    if (errors.hasOwnProperty('data')){
      errors.data.forEach(element => {
        Alert.showToast('error', `Codigo: ${errors.codigo}. ${element}`);
      });
    } 
  },
}
