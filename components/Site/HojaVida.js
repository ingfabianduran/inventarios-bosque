import pdfMake from 'pdfmake/build/pdfmake';
pdfMake.fonts = {
  Roboto: {
    normal: 'BarlowCondensed-Regular',
    bold: 'BarlowCondensed-Bold',
    italics: 'BarlowCondensed-Italic',
    bolditalics: 'BarlowCondensed-BoldItalic'
  }
};
import pdfFonts from 'pdfmake/build/vfs_fonts';
import numbro from 'numbro';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  getHojaVida(equipo) {
    let pdf = {
      content: [
        {
          table: {
            widths: ['auto', '*', '*'],
            body: [
              [{ rowSpan: 3, text: 'HOJA DE VIDA DE EQUIPOS DE COMPUTO', alignment: 'center', style: 'titulos' }, { text: 'FECHA DE EMISIÓN', style: 'subtitulos' }, '29/03/2021'],
              ['', { text: 'VERSIÓN', style: 'subtitulos' }, '1'],
              ['', { colSpan: 2, text: 'DOCUMENTO CONTROLADO', alignment: 'center' }],
              [{ text: 'SERIAL PC', style: 'subtitulos' }, { colSpan: 2, text: equipo.serie, alignment: 'center' }],
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
                { text: 'Marca', style: 'subtitulos' }, { text: equipo.modelo.marca.nombre },
                { text: 'Modelo', style: 'subtitulos' }, { text: equipo.modelo.descripcion },
                { text: 'Valor', style: 'subtitulos' }, { text: `$ ${numbro(equipo.valor).format({ thousandSeparated: true, mantissa: 0 })}` }
              ],
              [{ colSpan: 6, text: '2. CONFIGURACIÓN DE HARDWARE', style: 'titulos' }, '', '', '', '', ''],
              [
                { colSpan: 3, text: 'Procesador', style: 'subtitulos' }, '', '',
                { colSpan: 3, text: `${equipo.modelo.procesador.nombre} ${equipo.modelo.procesador.frecuencia}` }, '', '',
              ],
              [
                { colSpan: 3, text: 'Memoria RAM', style: 'subtitulos' }, '', '',
                { colSpan: 3, text: `${equipo.memoria.capacidad} ${equipo.memoria.tipo}` }, '', '',
              ],
              [
                { colSpan: 3, rowSpan: 2, text: 'Disco Duro', style: 'subtitulos' }, '', '',
                { text: 'Marca', style: 'subtitulos', alignment: 'center' },
                { text: 'Capacidad', style: 'subtitulos', alignment: 'center' },
                { text: 'Tecnologia', style: 'subtitulos', alignment: 'center' },
              ],
              [
                '', '', '', { text: equipo.disco.descripcion, alignment: 'center' }, { text: equipo.disco.capacidad, alignment: 'center' }, { text: equipo.disco.tipo, alignment: 'center' }
              ],
              [
                { text: 'Perifericos', style: 'subtitulos' },
                { colSpan: 5, text: equipo.caracteristica.perifericos }, '', '', '', ''
              ],
              [{ colSpan: 6, text: '3. CONFIGURACIÓN DE RED', style: 'titulos' }, '', '', '', '', ''],
              [
                { colSpan: 2, text: 'Nombre de red', style: 'subtitulos' }, '',
                { colSpan: 4, text: equipo.caracteristica.nombre_red }, '', '',
              ],
            ]
          }
        },
        {
          margin: [0, 5, 0, 0],
          table: {
            widths: ['*', '*'],
            body: this.tablaDinamica(equipo.macs,
              [{ text: 'Tipo', style: 'subtitulos', col: 'tipo', alignment: 'center' }, { text: 'Mac', style: 'subtitulos', col: 'mac', alignment: 'center' }],
              [{ colSpan: 2, text: '4. DIRECCIONES MAC', style: 'titulos' }, ''],
            )
          }
        },
        {
          margin: [0, 5, 0, 0],
          table: {
            widths: ['*', '*', '*'],
            body: this.tablaDinamica(equipo.pantallas,
              [{ text: 'Tipo', style: 'subtitulos', col: 'tipo', alignment: 'center' }, { text: 'Marca', style: 'subtitulos', col: 'marca', alignment: 'center' }, { text: 'Pulgadas', style: 'subtitulos', col: 'pulgadas', alignment: 'center' }],
              [{ colSpan: 3, text: '5. MONITORES Y/O PANTALLAS', style: 'titulos' }, '', ''],
            )
          }
        },
        {
          margin: [0, 5, 0, 0],
          table: {
            widths: ['*'],
            body: this.tablaDinamica(equipo.sistema_operativos,
              [{ text: 'Sistema Operativo', style: 'subtitulos', col: 'nombre', alignment: 'center' }],
              [{ text: '6. SISTEMAS OPERATIVOS', style: 'titulos' }],
            )
          }
        },
        {
          margin: [0, 5, 0, 0],
          table: {
            widths: ['*', '*', '*', '*'],
            body: this.tablaDinamica(equipo.mantenimientos,
              [{ text: 'Fecha', style: 'subtitulos', col: 'created_at', alignment: 'center' }, { text: 'Tipo', style: 'subtitulos', col: 'tipo', alignment: 'center' }, { text: 'Categoria', style: 'subtitulos', col: 'categoria', alignment: 'center' }, { text: 'Tecnico', style: 'subtitulos', col: 'user', alignment: 'center' }],
              [{ colSpan: 4, text: '7. MANTENIMIENTOS', style: 'titulos' }, '', '', ''],
            )
          }
        },
        {
          margin: [0, 5, 0, 0],
          table: {
            widths: ['*', '*', '*'],
            body: this.tablaDinamica(equipo.asignaciones,
              [{ text: 'Fecha', style: 'subtitulos', col: 'created_at', alignment: 'center' }, { text: 'Ubicación', style: 'subtitulos', col: 'espacio', alignment: 'center' }, { text: 'Responsable', style: 'subtitulos', col: 'responsable', alignment: 'center' }],
              [{ colSpan: 3, text: '8. MOVIMIENTOS', style: 'titulos' }, '', ''],
            )
          }
        },
      ],
      styles: {
        titulos: {
          bold: true,
          fontSize: 16,
          fillColor: '#F27830',
          color: '#FFFFFF'
        },
        subtitulos: {
          bold: true,
          fontSize: 14,
          fillColor: '#ECEFF1'
        },
      },
    }
    pdfMake.createPdf(pdf).open();
  },

  tablaDinamica(data, columnas, tituloTabla) {
    let body = [];
    body.push(tituloTabla);
    body.push(columnas);
    data.forEach(function(row) {
      let dataRow = [];
      columnas.forEach(function(columna) {
        if (columna.col === 'marca') {
          dataRow.push({ text: row.marca.nombre, alignment: 'center' });
        } else if (columna.col === 'categoria') {
          dataRow.push({ text: row.categoria.nombre, alignment: 'center' });
        } else if (columna.col === 'user') {
          dataRow.push({ text: `${row.user.nombre} ${row.user.apellido}`, alignment: 'center' });
        } else if (columna.col === 'espacio') {
          dataRow.push({ text: row.espacio.nombre, alignment: 'center' });
        } else if (columna.col === 'responsable') {
          dataRow.push({ text: row.responsable.nombre, alignment: 'center' });
        } else {
          dataRow.push({ text: row[columna.col], alignment: 'center' });
        }
      })
      body.push(dataRow);
    });
    return body;
  },
};
