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
  },
  async showFormAranda(titulo, textBtn, aranda) {
    const { value: form } = await Swal.fire({
      title: titulo,
      showCancelButton: true,
      confirmButtonText: textBtn,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#F27830',
      cancelButtonColor: '#7BC142',
      html:
        `<select id="tipo" name="tipo" class="swal2-input">
          <option value="Requerimiento" ${(aranda.tipo === 'Requerimiento') ? 'selected' : ''}>Requerimiento</option>
          <option value="Incidente" ${(aranda.tipo === 'Incidente') ? 'selected' : ''}>Incidente</option>
        </select>
        <input id="caso" name="caso" class="swal2-input" value="${aranda.caso}">`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          tipo: document.getElementById('tipo').value,
          caso: document.getElementById('caso').value
        }
      }
    });

    if (form) {
      return form;
    }
  }
}
