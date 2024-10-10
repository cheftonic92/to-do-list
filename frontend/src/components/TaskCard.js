import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TaskCard = ({ data, onEditTask, onDeleteTask }) => {
  return (
    <div className="card mb-3" style={{ backgroundColor: '#f0f6ff', padding: '20px', paddingBottom: '7px' }}>
      <div className="card-body" style={{ padding: '0', paddingBottom: '10px' }}>
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ maxWidth: '60%' }}>
            <h5>{data.title}</h5>
            <p style={{ padding: '15px', paddingLeft: '0' }}>
              <strong>Descripción:</strong> <br />
              {data.description}
            </p>
            <p className="mb-0">
              <strong>Creada:</strong> {new Date(data.created).toLocaleDateString()}
            </p>
          </div>
          <div className="text-end mb-0" style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div className="d-flex">
              <button className="btn btn-outline-primary me-2" onClick={onEditTask}> {/* Usa onEditTask correctamente */}
                <FaEdit size={15} />
              </button>
              <button className="btn btn-outline-danger" onClick={onDeleteTask}>
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
      </div>
    </div>
  );
};

export default TaskCard;
