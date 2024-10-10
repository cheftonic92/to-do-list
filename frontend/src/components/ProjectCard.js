import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { deleteProject } from '../services/ApiService';
import { toast } from 'react-toastify';
import TaskList from './TaskList';

const ProjectCard = ({ data, onAddTask, onEditProject, handleSave, onEditTask }) => {
  const [showTasks, setShowTasks] = useState(false); // Estado para controlar el despliegue de las tareas
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 576); // Consideramos móvil si el ancho es menor o igual a 576px
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    try {
      if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
        await deleteProject(data.id);
        toast.success('Proyecto eliminado con éxito');
        handleSave();
      }
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
      toast.error('Error eliminando proyecto');
    }
  };

  return (
    <div className="card mb-3" style={{ backgroundColor: '#f0f6ff', padding: '20px', paddingBottom: '7px' }}>
      <div className="card-body" style={{ padding: '0', paddingBottom: '10px' }}>
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
              <strong>Status:</strong> {data.status === 0 ? 'Sin iniciar' : data.status === 1 ? 'En proceso' : 'Finalizado'}
            </p>
          </>
        ) : (
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
                  <FaPlus size={15} />
                </button>
                <button className="btn btn-outline-primary me-2" onClick={() => onEditProject('update', data)}>
                  <FaEdit size={15} />
                </button>
                <button className="btn btn-outline-danger" onClick={handleDeleteClick}>
                  <FaTrash size={15} />
                </button>
              </div>
              <p className="text-end" style={{ padding: '15px', paddingRight: '0' }}>
                <strong>Deadline:</strong> {new Date(data.deadline).toLocaleDateString()}
              </p>
              <p className="text-end mb-0">
                <strong>Status:</strong> {data.status === 0 ? 'Sin iniciar' : data.status === 1 ? 'En proceso' : 'Finalizado'}
              </p>
            </div>
          </div>
        )}
        <button className="btn btn-secondary w-100 mt-3" onClick={() => setShowTasks(!showTasks)}>
          {showTasks ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {showTasks && (
          <TaskList
            show={showTasks}
            handleClose={() => setShowTasks(false)}
            projectId={data.id}
            projectName={data.title}
            onEditTask={onEditTask}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
