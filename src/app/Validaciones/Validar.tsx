export interface Evento {
  nombre: string;
  asistentes: string;
  tipo: string;
  descripcion: string;
  fecha: string;
}
export const validarFormularioEvento = (evento: Evento): string => {
  if (!evento.nombre.trim()) return 'El nombre del evento es requerido';
  if (!evento.asistentes.trim()) return 'Los asistentes son requeridos';
  if (!evento.tipo.trim()) return 'El tipo de evento es requerido';
  if (!evento.descripcion.trim()) return 'La descripción es requerida';
  if (!evento.fecha.trim()) return 'La fecha es requerida';

  const numAsistentes = Number(evento.asistentes);
  if (isNaN(numAsistentes) || numAsistentes <= 0) {
    return 'Debe ingresar un número válido de asistentes (mayor a 0)';
  }

  const fechaEvento = new Date(evento.fecha);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (fechaEvento < hoy) {
    return 'La fecha del evento no puede ser anterior al día actual';
  }

  return '';
};
