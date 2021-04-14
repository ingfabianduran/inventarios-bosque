import Alert from '~/components/Site/SweetAlert';

export default {
  showError(errors) {
    if (errors.hasOwnProperty('data')){
      errors.data.forEach(element => {
        Alert.showToast('error', `Codigo: ${errors.codigo}. ${element}`);
      });
    } else if (errors.hasOwnProperty('error')) {
      Alert.showToast('error', `Codigo: ${errors.codigo}. ${errors.error}`)
    } else if (errors.hasOwnProperty('descripcion')) {
      Alert.showToast('error', `Codigo: ${errors.codigo}. ${errors.descripcion}`);
    }
  }
}
