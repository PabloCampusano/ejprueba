'use client'
import { useEffect, useState } from 'react';
export const useEventStorage = () => {
  const [eventos, setEventos] = useState<any[]>([]);

  useEffect(() => {
    const guardados = localStorage.getItem('eventos');
    if (guardados) {
      setEventos(JSON.parse(guardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('eventos', JSON.stringify(eventos));
  }, [eventos]);

  return { eventos, setEventos };
};

export const useFormHandler = (initialState: any) => {
  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormValues(initialState);
  };

  return { formValues, setFormValues, handleChange, resetForm };
};
