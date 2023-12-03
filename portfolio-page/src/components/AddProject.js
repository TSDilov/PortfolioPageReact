import React from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import './AddProject.css';

const AddProject = () => {
  const [newProject, setNewProject] = React.useState({ name: '', description: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const projectId = new URLSearchParams(location.search).get('id');

  React.useEffect(() => {
    if (projectId) {
      fetch(`http://localhost:3001/api/projects/${projectId}`)
        .then((response) => response.json())
        .then((data) => setNewProject(data))
        .catch((error) => console.error('Error fetching project data:', error));
    }
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/projects${projectId ? `/${projectId}` : ''}`, {
        method: projectId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      const result = await response.json();

      if (result.success) {
        console.log(`Project ${projectId ? 'updated' : 'added'} successfully!`);
        navigate('/projects');
      } else {
        console.error(`Failed to ${projectId ? 'update' : 'add'} project:`, result.error);
      }
    } catch (error) {
      console.error(`Error ${projectId ? 'updating' : 'adding'} project:`, error);
    }
    setNewProject({ name: '', description: '' });
  };

  return (
    <div className="add-project-container">
      <h2>{projectId ? 'Edit Project' : 'Add New Project'}</h2>
      <form onSubmit={handleSubmit}>
      <label>
              Name:
              <input
                type="text"
                name="name"
                value={newProject.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={newProject.description}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit">{projectId ? 'Edit Project' : 'Add Project'}</button>
      </form>
    </div>
  );
};

export default AddProject;