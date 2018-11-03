import React from 'react'
import './Form.css';
import swal from 'sweetalert';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.min.css';

class Form extends React.Component {
	state = {
		fecha: moment(),
		peso: ''
	}
	onSubmit = () => {

		const {fecha, peso}	= this.state;

		if (!peso || isNaN(peso) || peso < 0) {
			swal('Lectura invalida','El registro de peso debe ser valido', 'error');
		} else {
			this.props.onAceptar(this.state);
		}
	}

	cambioFecha = (fecha) => {
			this.setState({ fecha });
	}
	cambioPeso = (event) => {
			this.setState({
				peso: event.target.value
			});
	}
	
	render () {
		return (
			<div className='row'>
				<div className={`form-container scale-transition scale-out ${this.props.visible ? "scale-in":""} col s4 offset-s4 z-depth-4 cyan lighten-3`}>
						<form>
								<label htmlFor='fecha'>
										Fecha:
										<DatePicker
											  selected={this.state.fecha}
												onChange={this.cambioFecha}
											/>

								</label>
								<label htmlFor='peso'>
										Peso:
										<input type='text' name='peso' id='peso'
											value={this.state.peso}
											onChange={this.cambioPeso}></input>
								</label>
								<input className='btn' type='button' value='Agregar' onClick={this.onSubmit}/>
								<input className='btn' type='button' value='Cerrar'onClick={()=>this.props.onCerrar()}/>
						</form>
				</div>
			</div>
		)
	}
}

export default Form;
