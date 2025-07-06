'use client'
import { useState } from 'react';
import Styles from './page.module.css';
import { validarFormularioEvento } from './Validaciones/Validar';
import { useEventStorage, useFormHandler } from './Effect/Effect';

interface Evento {
  nombre: string;
  asistentes: string;
  tipo: string;
  descripcion: string;
  fecha: string;
}
export default function App() {
  const eventoInicial: Evento = {
    nombre: '',
    asistentes: '',
    tipo: '',
    descripcion: '',
    fecha: ''
  };
  const { eventos, setEventos } = useEventStorage();
  const { 
    formValues: evento, 
    setFormValues: setEvento, 
    handleChange, 
    resetForm 
  } = useFormHandler(eventoInicial);
  const [modoEditar, setModoEditar] = useState(false);
  const [indiceEditar, setIndiceEditar] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [eventoAEliminar, setEventoAEliminar] = useState<number | null>(null);

  const guardarEvento = () => {
    const errorValidacion = validarFormularioEvento(evento);
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }
    setError('');
    if (modoEditar && indiceEditar !== null) {
      const actualizados = [...eventos];
      actualizados[indiceEditar] = {...evento};
      setEventos(actualizados);
      setModoEditar(false);
      setIndiceEditar(null);
    } else {
      setEventos([...eventos, {...evento}]);
    }
    
    resetForm();
  };
  const editarEvento = (index: number) => {
    setEvento(eventos[index]);
    setModoEditar(true);
    setIndiceEditar(index);
  };
  const confirmarEliminarEvento = (index: number) => {
    setEventoAEliminar(index);
  };
  const cancelarEliminarEvento = () => {
    setEventoAEliminar(null);
  };
  const eliminarEvento = () => {
    if (eventoAEliminar !== null) {
      const nuevosEventos = eventos.filter((_, i) => i !== eventoAEliminar);
      setEventos(nuevosEventos);
      setEventoAEliminar(null);
    }
  };
  return (
    <div className={Styles.container}>
      <h2 className={Styles.titulo}>{modoEditar ? 'Editar Evento' : 'Registrar Evento'}</h2>
      {error && <p className={Styles.error}>{error}</p>}
      <input 
        className={Styles.input} 
        name="nombre" 
        placeholder="Nombre del evento" 
        value={evento.nombre} 
        onChange={handleChange} 
      />
      <br />
      <input 
        className={Styles.input} 
        name="asistentes" 
        type="number" 
        placeholder="Asistentes" 
        value={evento.asistentes} 
        onChange={handleChange} 
      />
      <br />
      <select 
        className={Styles.select} 
        name="tipo" 
        value={evento.tipo} 
        onChange={handleChange}
      >
        <option value="">Selecciona tipo</option>
        <option value="Reunión">Reunión</option>
        <option value="Taller">Taller</option>
        <option value="Charla">Charla</option>
      </select>
      <br />
      <textarea 
        className={Styles.textarea} 
        name="descripcion" 
        placeholder="Descripción" 
        value={evento.descripcion} 
        onChange={handleChange}
      />
      <br />
      <input 
        className={Styles.input} 
        name="fecha" 
        type="date" 
        value={evento.fecha} 
        onChange={handleChange} 
      />
      <br /><br />
      <button className={Styles.button} onClick={guardarEvento}>
        {modoEditar ? 'Guardar cambios' : 'Registrar'}
      </button>
      <hr className={Styles.divisor} />
      <h3 className={Styles.subtitulo}>Eventos Guardados</h3>
      {eventos.length === 0 && (
        <p className={Styles.sinEventos}>No hay eventos registrados aún.</p>
      )}
      {eventoAEliminar !== null && (
        <div className={Styles.modal}>
          <div className={Styles.modalContent}>
            <h3>¿Estás seguro de eliminar este evento?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div className={Styles.modalButtons}>
              <button className={Styles.button} onClick={cancelarEliminarEvento}>
                Cancelar
              </button>
              <button 
                className={`${Styles.button} ${Styles.deleteButton}`} 
                onClick={eliminarEvento}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
      {eventos.map((e, index) => (
        <div key={index} className={Styles.tarjetaEvento}>
          <h4 className={Styles.nombreEvento}>{e.nombre}</h4>
          <p className={Styles.detalleEvento}>Tipo: {e.tipo}</p>
          <p className={Styles.detalleEvento}>Asistentes: {e.asistentes}</p>
          <p className={Styles.detalleEvento}>Descripción: {e.descripcion}</p>
          <p className={Styles.detalleEvento}>Fecha: {new Date(e.fecha).toLocaleDateString()}</p>
          <div className={Styles.controles}>
            <button 
              className={Styles.button} 
              onClick={() => editarEvento(index)}
            >
              Editar
            </button>
            <button 
              className={`${Styles.button} ${Styles.deleteButton}`} 
              onClick={() => confirmarEliminarEvento(index)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
