"use client"
import { useEffect, useState } from "react";

export default function App() {
  const eventoInicial = {
    nombre: '',
    asistentes: '',
    tipo: '',
    descripcion: '',
    fecha: ''
  }

  const [evento, setEvento] = useState(eventoInicial)
  const [eventos, setEventos] = useState([])
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

  const handleChange = (e) => {
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



















































































}