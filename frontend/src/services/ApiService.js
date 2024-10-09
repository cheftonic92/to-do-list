import axios from "axios";

// Usar variables de entorno para las URLs del API
const API_PROJECT_URL = process.env.REACT_APP_API_PROJECT_URL;
const API_TASK_URL = process.env.REACT_APP_API_TASK_URL;

// *** Proyectos ***

export const getProjectByClient = async (client) => {
  try {
    const response = await axios.get(`${API_PROJECT_URL}/GetProjectByClient.php`, {
      params: { client: encodeURIComponent(client) },  // Codificar el parámetro client
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching projects by client "${client}":`, error);
    throw error;
  }
};

export const getAllProjects = async () => {
  try {
    const response = await axios.get(`${API_PROJECT_URL}/GetAllProjects.php`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all projects:', error);
    throw error;
  }
};

// Crear un nuevo proyecto
export const createProject = async (projectData) => {
  try {
    const response = await axios.post(`${API_PROJECT_URL}/CreateProject.php`, projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error.response ? error.response.data : error);
    throw error;
  }
};

// Actualizar un proyecto
export const updateProject = async (projectId, projectData) => {
  try {
    console.log('Enviando datos para actualización:', { id: projectId, ...projectData });
    const response = await axios.put(`${API_PROJECT_URL}/UpdateProject.php`, { id: projectId, ...projectData });
    return response.data;
  } catch (error) {
    console.error(`Error updating project with ID ${projectId}:`, error.response ? error.response.data : error);
    throw error;
  }
};

// Eliminar un proyecto
export const deleteProject = async (projectId) => {
  try {
    const response = await axios.delete(`${API_PROJECT_URL}/DeleteProject.php`, {
      params: { project_id: projectId },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting project with ID ${projectId}:`, error.response ? error.response.data : error);
    throw error;
  }
};

// Eliminar todos los proyectos
export const deleteAllProjects = async () => {
  try {
    const response = await axios.delete(`${API_PROJECT_URL}/DeleteAllProjects.php`);
    return response.data;
  } catch (error) {
    console.error('Error deleting all projects:', error.response ? error.response.data : error);
    throw error;
  }
};

// *** Tareas ***

// Obtener tareas por ID de proyecto
export const getTasksByProject = async (projectId) => {
  try {
    const response = await axios.get(`${API_TASK_URL}/GetTaskByProject.php?project_id=${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching tasks for project with ID ${projectId}:`, error.response ? error.response.data : error);
    throw error;
  }
};

// Crear una nueva tarea
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_TASK_URL}/CreateTask.php`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error.response ? error.response.data : error);
    throw error;
  }
};

// Actualizar una tarea
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await axios.put(`${API_TASK_URL}/UpdateTask.php`, { id: taskId, ...taskData });
    return response.data;
  } catch (error) {
    console.error(`Error updating task with ID ${taskId}:`, error.response ? error.response.data : error);
    throw error;
  }
};

// Eliminar una tarea
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_TASK_URL}/DeleteTask.php`, {
      params: { task_id: taskId },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting task with ID ${taskId}:`, error.response ? error.response.data : error);
    throw error;
  }
};

// Eliminar todas las tareas
export const deleteAllTasks = async () => {
  try {
    const response = await axios.delete(`${API_TASK_URL}/DeleteAllTasks.php`);
    return response.data;
  } catch (error) {
    console.error('Error deleting all tasks:', error.response ? error.response.data : error);
    throw error;
  }
};
