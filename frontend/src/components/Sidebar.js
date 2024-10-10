import React, { useState, useEffect } from 'react';
import { Button, Offcanvas, Form, FloatingLabel } from 'react-bootstrap';
import { createProject, updateProject, createTask, updateTask } from '../services/ApiService';
import { toast } from 'react-toastify';

const Sidebar = ({ show, handleClose, action, type, data, handleSave, selectedProject }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [client, setClient] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('');
  const [projectId, setProjectId] = useState(null); // Solo para tareas

  useEffect(() => {
    if (action === 'update' && data) {
      setTitle(data.title || '');
      setDescription(data.description || '');
      setDeadline(data.deadline || '');
      setStatus(data.status || '');

      if (type === 'task') {
        // Asegúrate de que el project_id esté presente al actualizar una tarea
        setProjectId(data.project_id || selectedProject?.id || null); 
      } else if (type === 'project') {
        setClient(data.client || '');
      }
    } else if (action === 'create') {
      // Resetear los campos cuando se crea un nuevo proyecto o tarea
      setTitle('');
      setDescription('');
      setClient('');
      setDeadline('');
      setStatus('');

      if (type === 'task') {
        // Si se está creando una nueva tarea, usar el selectedProject para obtener el project_id
        setProjectId(selectedProject?.id || null);
      }
    }
  }, [action, data, type, selectedProject]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      title,
      description,
      client,
      deadline,
      status
    };

    const taskData = {
      title,
      description,
      deadline,
      status,
      project_id: projectId // Asegúrate de que el ID del proyecto esté presente en las tareas
    };

    try {
      if (action === 'create') {
        if (type === 'project') {
          await createProject(projectData);
          toast.success('Proyecto creado con éxito');
        } else if (type === 'task') {
          if (!taskData.project_id) {
            toast.error('El ID del proyecto es obligatorio para crear una tarea.');
            return;
          }
          await createTask(taskData);
          toast.success('Tarea creada con éxito');
        }
      } else if (action === 'update') {
        if (type === 'project') {
          await updateProject(data.id, projectData);
          toast.success('Proyecto actualizado con éxito');
        } else if (type === 'task') {
          await updateTask(data.id, taskData);
          toast.success('Tarea actualizada con éxito');
        }
      }
      handleClose();
      handleSave();
    } catch (error) {
      console.error('Error al guardar:', error);
      toast.error('Error al guardar');
    }
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {type === 'project' && (action === 'create' ? 'Crear nuevo proyecto' : `Actualizar ${data?.title || ''}`)}
          {type === 'task' && (action === 'create' 
            ? `Crear nueva tarea para ${selectedProject?.title || 'el proyecto'}`
            : `Actualizar tarea en ${selectedProject?.title || ''}`)}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingInput" label="Título" className="mb-3">
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Descripción" className="mb-3">
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </FloatingLabel>

          {/* Solo mostrar el campo "Cliente" si es un proyecto */}
          {type === 'project' && (
            <FloatingLabel controlId="floatingInput" label="Cliente" className="mb-3">
              <Form.Control
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                required
              />
            </FloatingLabel>
          )}

          {action === 'create' && (
            <FloatingLabel controlId="floatingInput" label="Fecha de creación" className="mb-3">
              <Form.Control
                type="date"
                value={new Date().toISOString().split('T')[0]} // Formato correcto 'YYYY-MM-DD'
                placeholder={new Date().toISOString().split('T')[0]} // Formato correcto 'YYYY-MM-DD'
                required
                disabled
             />
            </FloatingLabel>
          )}

          <FloatingLabel controlId="floatingInput" label="Fecha límite" className="mb-3">
            <Form.Control
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput" label="Estado" className="mb-3">
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="" disabled>Selecciona el estado</option>
              <option value="0">Sin iniciar</option>
              <option value="1">En proceso</option>
              <option value="2">Finalizado</option>
            </Form.Control>
          </FloatingLabel>

          <Button variant="outline-primary" type="submit" id="button-addon2">
            {action === 'create' && type === 'project' && 'Crear Proyecto'}
            {action === 'create' && type === 'task' && 'Crear Tarea'}
            {action === 'update' && `Actualizar ${title}`}
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
