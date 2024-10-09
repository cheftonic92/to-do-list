import React, { useState, useEffect } from 'react';
import { Button, Offcanvas, Form, FloatingLabel } from 'react-bootstrap';
import { createProject, updateProject } from '../services/ApiService';
import { toast } from 'react-toastify';

const Sidebar = ({ show, handleClose, action, data, handleSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [client, setClient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');

  // Función para formatear la fecha a 'yyyy-MM-dd'
  const formatDateToYMD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JS son 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Efecto para inicializar los campos si se va a editar o crear un proyecto
  useEffect(() => {
    if (action === 'update' && data) {
      setTitle(data.title);
      setDescription(data.description);
      setClient(data.client);
      setStartDate(data.startDate); // Asumimos que `project.startDate` ya está en formato correcto
      setDeadline(data.deadline);
    } else {
      // Inicializamos los campos para la creación de un nuevo proyecto
      setTitle('');
      setDescription('');
      setClient('');
      setStartDate(formatDateToYMD(new Date())); // Establecemos la fecha de inicio en formato 'yyyy-MM-dd'
      setDeadline('');
    }
  }, [action, data]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página

    const projectData = {
      title,
      description,
      client,
      startDate,
      deadline,
    };

    try {
      if (action === 'create') {
        await createProject(projectData); // Crear nuevo proyecto
        toast.success('Proyecto creado con éxito');
      } else if (action === 'update') {
        await updateProject(data.id, projectData); // Actualizar proyecto existente
        toast.success('Proyecto actualizado con éxito');
      }
      handleClose(); // Cerrar la sidebar al finalizar
      handleSave(); // Refrescar la lista de proyectos
    } catch (error) {
      console.error('Error al guardar el proyecto:', error);
      toast.error('Error al guardar el proyecto'); // Muestra un solo error en caso de fallo
    }
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {action === 'create' && 'Crear nuevo proyecto'}
          {action === 'update' && 'Actualizar proyecto'}
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
          <FloatingLabel controlId="floatingInput" label="Cliente" className="mb-3">
            <Form.Control
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Fecha de inicio" className="mb-3">
            <Form.Control
              type="date"
              value={startDate} // Valor en formato correcto 'yyyy-MM-dd'
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Fecha límite" className="mb-3">
            <Form.Control
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </FloatingLabel>
          <Button variant="outline-primary" type="submit" id="button-addon2">
            {action === 'create' ? 'Crear Proyecto' : 'Actualizar Proyecto'}
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
