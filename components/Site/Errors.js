import Alert from '~/components/Site/SweetAlert';

export default {
  showErrors422(errors) {
    if (errors.hasOwnProperty('data')){
      errors.data.forEach(element => {
        Alert.showToast('error', `Codigo: ${errors.codigo}. ${element}`);
      });
    } else if (errors.hasOwnProperty('error')) {
      Alert.showToast('error', `Codigo: ${errors.codigo}. ${errors.error}`)
    }
  },
  showErrors503(errors) {
    Alert.showToast('error', `Codigo: ${errors.codigo}. ${errors.error}`);
  },
  showErrors404(errors) {
    Alert.showToast('error', `Codigo: ${errors.codigo}. ${errors.error}`);
  }
}
