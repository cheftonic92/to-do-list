// src/components/AddProjectButton.js

import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa'; // Importamos el icono de react-icons

const AddProjectButton = ({ onClick }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Función para comprobar el tamaño de la ventana
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 576); // Consideramos móvil cuando la pantalla es menor o igual a 576px (Bootstrap breakpoint)
    };

    // Comprobamos el tamaño al cargar y cuando la ventana se redimensiona
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    // Limpiamos el evento al desmontar el componente
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <button
      className="btn btn-primary"
      onClick={onClick}
      style={{ height: '38px' }} // Mantenemos la altura consistente
    >
      {isMobile ? <FaPlus /> : 'Añadir Proyecto'} {/* Cambiamos el texto por el icono cuando es móvil */}
    </button>
  );
};

export default AddProjectButton;
