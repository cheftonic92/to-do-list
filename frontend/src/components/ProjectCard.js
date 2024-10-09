// src/components/ProjectCard.js

import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { deleteProject } from '../services/ApiService';
import { toast } from 'react-toastify';

const ProjectCard = ({ data, onAddTask, onEditProject, handleSave }) => {

  const [showTasks, setShowTasks] = useState(false); // Estado para controlar el despliegue de las tareas
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Función para comprobar si estamos en una pantalla móvil
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 576); // Consideramos móvil si el ancho es menor o igual a 576px
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const statusText = {
    0: 'Sin iniciar',
    1: 'En proceso',
    2: 'Finalizado',
  };
  // Función para manejar la eliminación del proyecto
  const handleDeleteClick = (e) => {
    e.stopPropagation();
      try{
        window.confirm('¿Estás seguro de que deseas eliminar este proyecto?');
        deleteProject(data.id);
        toast.success('User deleted successfully');
        handleSave();
    }catch(error){
      console.error("There was an error!", error);
      toast.error('Error deleting user');
    }
  }

  const toggleTasks = () => {
    setShowTasks(!showTasks); // Cambia el estado para mostrar o colapsar las tareas
  };

  return (
    <div className="card mb-3" style={{ backgroundColor: '#f0f6ff', padding: '20px', paddingBottom: '7px' }}>
      <div className="card-body" style={{padding: '0', paddingBottom: '10px'}}>
        {/* Disposición para móvil: título y botones en una fila */}
        {isMobile ? (
          <>
            <div className="d-flex mb-0 justify-content-between me-0">
              <h5>{data.title}</h5>
              <div className="d-flex mb-3">
                <button className="btn btn-outline-success me-2" onClick={onAddTask}>
                  <FaPlus />
                </button>
                <button className="btn btn-outline-primary me-2" onClick={onEditProject}>
                  <FaEdit />
                </button>
                <button className="btn btn-outline-danger" onClick={handleDeleteClick}>
                  <FaTrash />
                </button>
              </div>
            </div>
            <p>
              <strong>Descripción:</strong> <br />
              {data.description}
            </p>
            <p>
              <strong>Cliente:</strong> {data.client}
            </p>
            <p>
              <strong>Deadline:</strong> {new Date(data.deadline).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong> {statusText[data.status]}
            </p>
          </>
        ) : (
          // Disposición para pantallas no móviles
          <div className="d-flex justify-content-between align-items-center">
            <div style={{ maxWidth: '60%' }}>
              <h5>{data.title}</h5>
              <p style={{ padding: '15px', paddingLeft: '0' }}>
                <strong>Descripción:</strong> <br />
                {data.description}
              </p>
              <p className="mb-0">
                <strong>Cliente:</strong> {data.client}
              </p>
            </div>
            <div className="text-end mb-0" style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div className="d-flex">
                <button className="btn btn-outline-success me-2" onClick={onAddTask}>
                  <FaPlus size={15}/>
                </button>
                <button className="btn btn-outline-primary me-2" onClick={() => onEditProject('update', data)}>
                  <FaEdit size={15}/>
                </button>
                <button className="btn btn-outline-danger" onClick={handleDeleteClick}>
                  <FaTrash size={15}/>
                </button>
              </div>
              <p className="text-end" style={{ padding: '15px', paddingRight: '0'}}>
                <strong>Deadline:</strong> {new Date(data.deadline).toLocaleDateString()}
              </p>
              <p className="text-end mb-0">
                <strong>Status:</strong> {statusText[data.status]}
              </p>
            </div>
          </div>
        )}
        <button className="btn btn-secondary w-100 mt-3" onClick={toggleTasks}>
          {showTasks ? <FaChevronUp /> : <FaChevronDown />}
        </button>

         
      </div>
    </div>
  );
};

export default ProjectCard;
