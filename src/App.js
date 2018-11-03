import 'materialize-css/dist/css/materialize.min.css';
import React, { Component } from 'react';
import TitleBar from './components/TitleBar';
import Highcharts from 'highcharts';
import moment from 'moment';
import Grafica from './components/Grafica';
import Tabla from './components/Tabla';
import Form from './components/Form';

moment.locale('es');
class App extends Component {

  state = {
    registros: [],
    modal: false
  }

  componentDidMount(){
    if(localStorage.getItem('registros')){
      const registros = JSON.parse(localStorage.getItem('registros'));

      this.setState({registros});
    }
  }

  aceptarRegistro = ({fecha, peso}) => {
    const nuevoregistro = [+fecha,+peso];
    const registros = [...this.state.registros, nuevoregistro];
    localStorage.setItem('registros', JSON.stringify(registros));

    this.setState({registros});
    //this.setState((prevState, props) => ({
      //registros: [...prevState.registros, nuevoregistro]
    //}));
  }

  borrarRegistro = (fecha) => {
      const registros = [...this.state.registros.filter(item => item[0] !== fecha)];

      localStorage.setItem('registros', JSON.stringify(registros));
      this.setState({registros});
  }

  cerrarVentana = () => {
    this.setState({modal: false});
  }

  render() {
    const btnAdd={
      position: "absolute",
      top: "80%",
      right: "10%"
    }

    return (
      <div>
        <Form
            visible={this.state.modal}
            onAceptar={this.aceptarRegistro}
            onCerrar={this.cerrarVentana}
          />
        <TitleBar />
        <main>
          <div className='valign-wrapper'>
            <h2>Registro Diario de Peso</h2>
          </div>
          <div className='row'>
            <div className='col l6 m12 s12'>
              <Grafica
                  registros={this.state.registros}
                />
            </div>
            <div className='col l6 m12 s12'>
              <Tabla
                  registros={this.state.registros}
                  borrarRegistro={this.borrarRegistro}
                />
            </div>
          </div>
          <a className='btn-floating btn-large waves-effect waves-light red'
              style={btnAdd}
              onClick={() =>this.setState({modal: true})}
              >
            <i className="material-icons">add</i>
          </a>
        </main>
      </div>
    );
  }
}

export default App;
