import React from 'react';
import moment from 'moment';

moment.locale('es');

const Tabla = ({registros, borrarRegistro}) => {

		const borrar = (fecha) => {
			borrarRegistro(fecha);
		}

	 const renderFila = (registro)=> (
    <tr key={registro[0]}>
      <td>{moment(registro[0]).format('LLLL')}</td>
      <td>{registro[1]}</td>
			<td><input className='btn' type='button' value='Borrar' onClick={()=>borrar(registro[0])}/></td>
    </tr>
  )

	return (
		<table className='z-depth-2 hoverable'>
			<thead>
				<th>Fecha</th>
				<th>Peso (Lbs)</th>
			</thead>
			<tbody>
				{
					registros.map(registro => (
						renderFila(registro)
					))
				}
			</tbody>
		</table>
	)
}

export default Tabla
