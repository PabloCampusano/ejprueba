 'use client'
import { useState, useEffect } from 'react'
import Styles from './page.module.css'

export default function App() {
  const eventoInicial = {
    nombre: '',
    asistentes: '',
    tipo: '',
    descripcion: '',
    fecha: ''
  }

  const [evento, setEvento] = useState(eventoInicial)
  const [eventos, setEventos] = useState<any[]>([])
  const [modoEditar, setModoEditar] = useState(false)
  const [indiceEditar, setIndiceEditar] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const guardados = localStorage.getItem('eventos')
    if (guardados) {
      setEventos(JSON.parse(guardados))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('eventos', JSON.stringify(eventos))
  }, [eventos])

  const handleChange = (e: any) => {
    setEvento({ ...evento, [e.target.name]: e.target.value })
  }

  const validarEvento = () => {
    if (!evento.nombre || !evento.asistentes || !evento.tipo || !evento.descripcion || !evento.fecha) {
      return 'Todos los campos son obligatorios.';
    }
    if (evento.asistentes <= 0) {
      return 'El número de asistentes debe ser un número positivo.';
    }
    if (new Date(evento.fecha) < new Date()) {
      return 'La fecha no puede ser anterior a la fecha actual.';
    }
    return '';
  }

  const guardar = () => {
    const errorValidacion = validarEvento();
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }
    setError(''); // Limpiar el error si no hay
    if (modoEditar && indiceEditar !== null) {
      const copia = [...eventos]
      copia[indiceEditar] = evento
      setEventos(copia)
      setModoEditar(false)
      setIndiceEditar(null)
    } else {
      setEventos([...eventos, evento])
    }
    setEvento(eventoInicial)
  }

  const editar = (index: number) => {
    setEvento(eventos[index])
    setModoEditar(true)
    setIndiceEditar(index)
  }

  const eliminar = (index: number) => {
    const copia = eventos.filter((_, i) => i !== index)
    setEventos(copia)
  }

  return (
    <div className={Styles.container}>
      <h2 className={Styles.titulo}>{modoEditar ? 'Editar evento' : 'Registrar evento'}</h2>
      {error && <p className={Styles.error}>{error}</p>}
      <input className={Styles.input} name="nombre" placeholder="Nombre del evento" 
      value={evento.nombre} onChange={handleChange} /><br />
      <input className={Styles.input} name="asistentes" type="number" 
      placeholder="Asistentes" value={evento.asistentes} onChange={handleChange} /><br />
      <select className={Styles.select} name="tipo" value={evento.tipo} onChange={handleChange}>
        <option value="">Selecciona tipo</option>
        <option value="Reunión">Reunión</option>
        <option value="Taller">Taller</option>
        <option value="Charla">Charla</option>
      </select><br />
      <textarea className={Styles.textarea} name="descripcion" 
      placeholder="Descripción" value={evento.descripcion} onChange={handleChange}></textarea><br />
      <input className={Styles.input} name="fecha" type="date" 
      value={evento.fecha} onChange={handleChange} /><br /><br />

      <button className={Styles.button} onClick={guardar}>
        {modoEditar ? 'Guardar cambios' : 'Registrar'}
      </button>
      <hr className={Styles.divisor} />
      <h3 className={Styles.subtitulo}>Eventos guardados</h3>
      {eventos.length === 0 && <p className={Styles.sinEventos}>No hay eventos aún.</p>}
      {eventos.map((e, i) => (
        <div key={i} className={Styles.tajetaEvento}>
          <h4 className={Styles.nombreEvento}>{e.nombre}</h4>
          <p className={Styles.detalleEvento}>Tipo: {e.tipo}</p>
          <p className={Styles.detalleEvento}>Asistentes: {e.asistentes}</p>
          <p className={Styles.detalleEvento}>Descripción: {e.descripcion}</p>
          <p className={Styles.detalleEvento}>Fecha: {e.fecha}</p>
          <div className={Styles.controles}>
            <button className={Styles.button} onClick={() => editar(i)}>Editar</button>
            <button className={`${Styles.button} ${Styles.deleteButton}`} onClick={() => eliminar(i)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
