"use client"
import { useEffect, useState } from "react";

type Evento = {
  nombre: string
  asistentes: number
  tipo: string
  descripcion: string
  fecha: string
}

const eventoInicial: Evento = { 
  nombre: "",
  asistentes: 0,
  tipo:"",
  descripcion: "",
  fecha:""

}

export default function Home() {
  const [evento, setEvento] = useState(eventoInicial)
  const [eventoAEditar, setEventoAEditar] = useState(eventoInicial)
  const [eventos, setEventos] = useState<Evento[]>([])
  const [modoEdicion, setModoEdicion] = useState(false)
  return (
    <div>
      <h1>hola</h1>
    </div>
  );
}



