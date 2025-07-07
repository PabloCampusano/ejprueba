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

const MostrarEvento: React.FC = () => {
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
  const [appDesplegada, setAppDesplegada] = useState(false);

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
    <div className={Styles.menuContainer}>
      <div className={Styles.menuHeader}>
        <img 
          src="https://placehold.co/80x80" 
          alt="Logo del gestor de eventos, círculo azul con un icono de calendario en el centro"
          className={Styles.logo}
        />
        <h1 className={Styles.tituloPrincipal}>SELECCIONA TU MUSICA</h1>
      </div>
      
      {!appDesplegada && (
        <div className={Styles.pantallaInicio}>
          <p className={Styles.bienvenida}>
            Bienvenido al sistema de gestión de Musica. Aquí podrás registrar, editar y eliminar toda la musica que deseas.
          </p>
          <button 
            className={`${Styles.button} ${Styles.buttonLarge}`}
            onClick={() => setAppDesplegada(true)}
          >
            Comenzar
          </button>
          
          {eventos.length > 0 && (
            <div className={Styles.resumenEventos}>
              <h3>Tienes {eventos.length} evento{eventos.length !== 1 ? 's' : ''} registrado{eventos.length !== 1 ? 's' : ''}</h3>
              <p>Último evento: {eventos.length > 0 && new Date(eventos[eventos.length-1].fecha).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      )}

      {appDesplegada && (
        <div className={Styles.contenidoDesplegable}>
          {/* Botón para volver */}
          <button 
            className={`${Styles.button} ${Styles.backButton}`}
            onClick={() => setAppDesplegada(false)}
          >
            ← Volver al inicio
          </button>

          {/* Contenido principal de la aplicación */}
          <div className={Styles.formularioContainer}>
            <h2 className={Styles.titulo}>{modoEditar ? 'Editar Musica' : 'Registrar Musica'}</h2>
            {error && <p className={Styles.error}>{error}</p>}
            
            <div className={Styles.formGroup}>
              <label className={Styles.label}>Nombre del Musica:</label>
              <input 
                className={Styles.input} 
                name="nombre" 
                placeholder="Ej: llamada de emergencia" 
                value={evento.nombre} 
                onChange={handleChange} 
              />
            </div>

            <div className={Styles.formGroup}>
              <label className={Styles.label}>Número de cantantes:</label>
              <input 
                className={Styles.input} 
                name="asistentes" 
                type="number" 
                placeholder="Ej: 50" 
                value={evento.asistentes} 
                onChange={handleChange} 
              />
            </div>

            <div className={Styles.formGroup}>
              <label className={Styles.label}>Tipo de genero:</label>
              <select 
                className={Styles.select} 
                name="tipo" 
                value={evento.tipo} 
                onChange={handleChange}
              >
                <option value="">Selecciona el tipo de evento</option>
                <option value="Reunión">Rock</option>
                <option value="Taller">Pop</option>
                <option value="Charla">Cumbia</option>
                <option value="Conferencia">Regge</option>
                <option value="Seminario">Salsa</option>
              </select>
            </div>

            <div className={Styles.formGroup}>
              <label className={Styles.label}></label>
              <textarea 
                className={Styles.textarea} 
                name="descripcion" 
                placeholder="Describe tu gusto de musica" 
                value={evento.descripcion} 
                onChange={handleChange}
              />
            </div>

            <div className={Styles.formGroup}>
              <label className={Styles.label}>Ingrese fecha del consierto:</label>
              <input 
                className={Styles.input} 
                name="fecha" 
                type="date" 
                value={evento.fecha} 
                onChange={handleChange} 
              />
            </div>

            <button className={Styles.button} onClick={guardarEvento}>
              {modoEditar ? 'Guardar cambios' : 'Registrar evento'}
            </button>
          </div>

          <hr className={Styles.divisor} />
          
          <div className={Styles.listaEventos}>
            <h3 className={Styles.subtitulo}>Eventos Registrados</h3>
            {eventos.length === 0 && (
              <p className={Styles.sinEventos}>No hay eventos registrados aún.</p>
            )}
            
            {eventos.map((e, index) => (
              <div key={index} className={Styles.tarjetaEvento}>
                <div className={Styles.tarjetaHeader}>
                  <h4 className={Styles.nombreEvento}>{e.nombre}</h4>
                  <span className={`${Styles.tipoEvento} ${Styles[e.tipo]}`}>{e.tipo}</span>
                </div>
                <p className={Styles.detalleEvento}>
                  <span>📅 {new Date(e.fecha).toLocaleDateString()}</span>
                  <span>👥 {e.asistentes} asistentes</span>
                </p>
                <p className={Styles.descripcionEvento}>{e.descripcion}</p>
                <div className={Styles.controles}>
                  <button 
                    className={`${Styles.button} ${Styles.buttonSmall}`} 
                    onClick={() => editarEvento(index)}
                  >
                    Editar
                  </button>
                  <button 
                    className={`${Styles.button} ${Styles.buttonSmall} ${Styles.deleteButton}`} 
                    onClick={() => confirmarEliminarEvento(index)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
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
    </div>
  );
}
export default MostrarEvento;