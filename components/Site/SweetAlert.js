import Swal from 'sweetalert2';

export default {
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
  }
}