import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { RiUserAddFill } from "react-icons/ri";
import { Button } from 'react-bootstrap';
import ProjectCard from './components/ProjectCard';
import Sidebar from './components/Sidebar';
import { getAllProjects, getProjectByClient } from './services/ApiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarAction, setSidebarAction] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] =useState(null)
  const [sidebarType, setSidebarType] = useState(''); // Para diferenciar entre proyectos y tareas

  const handleCloseSidebar = () => { setShowSidebar(false); };

  const handleShowSidebar = (action, type, project = null, task = null) => {
    setSidebarAction(action);
    setSidebarType(type); // Define si es proyecto o tarea
    setSelectedProject(project); // Asegúrate de pasar correctamente el proyecto aquí
    setSelectedTask(task);
    setShowSidebar(true);
  };

  // Fetch projects when the component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch all projects from the API
  const fetchProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (error) {
      toast.error('Error al cargar los proyectos');
    }
  };

  // Handle search by client
  const handleSearch = async (client) => {
    try {
      const result = await getProjectByClient(client);
      setProjects(result); // Update the projects list
    } catch (error) {
      toast.error('Error al buscar proyectos para el cliente indicado');
    }
  };

  // Handle saving a project or task
  const handleSave = () => {
    fetchProjects(); // Recarga la lista de proyectos
  };

  // Función para ordenar los proyectos por fecha de deadline
const sortProjectsByDeadline = (projects) => {
  return projects.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
};

  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <div className="content container mt-3">
        {/* SearchBar and button for adding a new project */}
        <div className="d-flex align-items-center mb-3" style={{ gap: '10px' }}>
          <div className="flex-grow-1">
            <SearchBar onSearch={handleSearch} />
          </div>
          {/* Toggle sidebar on button click */}
          <Button
            className="btn btn-block d-block d-md-none btn-primary"
            id="button-addon2"
            onClick={() => handleShowSidebar('create', 'project')}
          >
            <RiUserAddFill />
          </Button>
          {/* El botón se muestra como texto en dispositivos no móviles */}
          <Button
            className="btn btn-block d-none d-md-block"
            variant="outline-primary"
            id="button-addon2"
            onClick={() => handleShowSidebar('create', 'project')}
          >
            Añadir Proyecto
          </Button>
        </div>

        {/* Project list */}
        <div className="project-list mt-4">
          {projects.length > 0 ? (
            // Aplicamos la función de ordenación antes de mapear los proyectos
          sortProjectsByDeadline(projects).map((project) => (
              <ProjectCard
                key={project.id}
                data={project}
                onAddTask={() => handleShowSidebar('create', 'task', project)} // Asegúrate de que project se pasa aquí
                onEditProject={() => handleShowSidebar('update', 'project', project)}
                handleSave={handleSave}
                onEditTask={(task) => handleShowSidebar('update', 'task', project, task)}
              />
            ))
          ) : (
            <p>No hay proyectos disponibles. Usa el botón "Añadir Proyecto" para comenzar.</p>
          )}
        </div>
      </div>

      <Sidebar
        show={showSidebar}
        handleClose={handleCloseSidebar}
        action={sidebarAction}
        type={sidebarType}
        data={sidebarType === 'task' ? selectedTask : selectedProject} // Pasas el proyecto o la tarea
        selectedProject={selectedProject} // Asegúrate de pasar selectedProject
        handleSave={handleSave} // Refresca la lista al guardar
      />

      <Footer />
    </div>
  );
};

export default App;
