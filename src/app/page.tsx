'use client'
import { useState, useEffect } from 'react'

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

  const guardar = () => {
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
    <div style={{ padding: 20 }}>
      <h2>{modoEditar ? 'Editar evento' : 'Registrar evento'}</h2>

      <input name="nombre" placeholder="Nombre del evento" value={evento.nombre} onChange={handleChange} /><br />
      <input name="asistentes" type="number" placeholder="Asistentes" value={evento.asistentes} onChange={handleChange} /><br />
      <select name="tipo" value={evento.tipo} onChange={handleChange}>
        <option value="">Selecciona tipo</option>
        <option value="Reunión">Reunión</option>
        <option value="Taller">Taller</option>
        <option value="Charla">Charla</option>
      </select><br />
      <textarea name="descripcion" placeholder="Descripción" value={evento.descripcion} onChange={handleChange}></textarea><br />
      <input name="fecha" type="date" value={evento.fecha} onChange={handleChange} /><br /><br />

      <button onClick={guardar}>{modoEditar ? 'Guardar cambios' : 'Registrar'}</button>

      <hr />
      <h3>Eventos guardados</h3>
      {eventos.length === 0 && <p>No hay eventos aún.</p>}
      {eventos.map((e, i) => (
        <div key={i} style={{ border: '1px solid gray', padding: 10, marginBottom: 10 }}>
          <b>{e.nombre}</b> - {e.tipo}<br />
          Asistentes: {e.asistentes}<br />
          {e.descripcion}<br />
          Fecha: {e.fecha}<br />
          <button onClick={() => editar(i)}>Editar</button>
          <button onClick={() => eliminar(i)} style={{ marginLeft: 10 }}>Eliminar</button>
        </div>
      ))}
    </div>
  )
}