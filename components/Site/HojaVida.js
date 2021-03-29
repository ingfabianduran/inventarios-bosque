import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


export default {
  getHojaVida() {
    let pdf = {
      content: [
        {
          table: {
            widths: ['auto', '*', '*'],
            body: [
              [{ rowSpan: 3, text: 'HOJA DE VIDA DE EQUIPOS DE COMPUTO', alignment: 'center', style: 'titulos' }, 'FECHA DE EMISIÓN', '29/03/2021'],
              ['', 'VERSIÓN', '1'],
              ['', { colSpan: 2, text: 'DOCUMENTO CONTROLADO', alignment: 'center' }],
              [{ text: 'SERIAL PC', style: 'subtitulos' }, { colSpan: 2, text: '8337675751237', alignment: 'center' }],
            ]
          }
        },
        {
          margin: [0, 5, 0, 0],
          table: {
            widths: ['*', '*', '*', '*', '*', '*'],
            body: [
              [{ colSpan: 6, text: '1. DATOS DEL EQUIPO', style: 'titulos' }, '', '', '', '', ''],
              [
                { text: 'Marca', style: 'subtitulos' }, { text: 'Lenovo' },
                { text: 'Modelo', style: 'subtitulos' }, { text: 'L-460' },
                { text: 'Valor', style: 'subtitulos' }, { text: '$2.500.000' }
              ],
              [{ colSpan: 6, text: '2. CONFIGURACIÓN DE HARDWARE', style: 'titulos' }, '', '', '', '', ''],
              [
                { colSpan: 3, text: 'Procesador', style: 'subtitulos' }, '', '',
                { colSpan: 3, text: 'Intel Core i3 2.66 GHz' }, '', '',
              ],
              [
                { colSpan: 3, text: 'Memoria RAM', style: 'subtitulos' }, '', '',
                { colSpan: 3, text: '4 GB DDR3' }, '', '',
              ],
              [
                { colSpan: 3, rowSpan: 2, text: 'Disco Duro', style: 'subtitulos' }, '', '',
                { text: 'Marca', style: 'subtitulos' },
                { text: 'Capacidad', style: 'subtitulos' },
                { text: 'Tecnologia', style: 'subtitulos' },
              ],
              [
                '', '', '', { text: 'Toshiba' }, { text: '500 GB' }, { text: 'SSD' }
              ],
            ]
          }
        }
      ],
      styles: {
        titulos: {
          bold: true,
          fontSize: 16
        },
        subtitulos: {
          bold: true,
          fillColor: '#F5F5F5',
          fontSize: 14
        }
      }
    }
    pdfMake.createPdf(pdf).open();
  }
};
