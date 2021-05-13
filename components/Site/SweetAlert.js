/**
  * @module components/Site/SweetAlert
*/
import Swal from 'sweetalert2';
/**
 * @property {Function} showToast - Muestra un mensaje sobre una notificación.
 * @property {Function} showConfirm - Muestra un alerta de confirmación.
*/
export default {
  /**
    * @param {String} icon - Tipo de notificación.
    * @param {String} text - Texto en la notificación.
  */
  showToast(icon, text) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });

    Toast.fire({
      icon: icon,
      title: text
    });
  },
  /**
    * @param {String} title - Titulo del alerta.
    * @param {String} message - Texto del alerta.
    * @param {String} icon - Icono del alerta.
    * @param {Function} callback - Funcion que retorna la respuesta seleccionada.
  */
  showConfirm(title, message, icon, callback) {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
      showCancelButton: true,
      confirmButtonText: 'Estoy Seguro',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#F27830',
      cancelButtonColor: '#7BC142'
    }).then((confirmed) => {
      callback(confirmed && confirmed.value == true);
    });
  },
}
