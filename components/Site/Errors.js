/**
  * @module components/Site/Errors
  * @property {Function} showError - Muestra un alerta con todos los errores generados en una peticion http.
*/
import Alert from '~/components/Site/SweetAlert';

export default {
  /**
    * @param {Object} error - Captura los errores generados.
  */
  showError(errors) {
    if (errors.hasOwnProperty('data')){
      errors.data.forEach(element => {
        Alert.showToast('error', `Codigo: ${errors.codigo}. ${element}`);
      });
    } else if (errors.hasOwnProperty('error')) {
      Alert.showToast('error', `Codigo: ${errors.codigo}. ${errors.error}`)
    } else if (errors.hasOwnProperty('descripcion')) {
      Alert.showToast('error', `Codigo: ${errors.codigo}. ${errors.descripcion}`);
    } else if (errors.hasOwnProperty('message')) {
      Alert.showToast('error', `Codigo: ${errors.codigo}. ${errors.message}`);
    }
  }
}
