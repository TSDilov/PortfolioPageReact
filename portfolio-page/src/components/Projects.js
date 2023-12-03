import React from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    fetch('/projects/projects.json') 
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects data:', error));
  }, []);

  const handleDelete = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/projects/${projectId}`, {
        method: 'DELETE',
      });
  
      const result = await response.json();
  
      if (result.success) {
        console.log('Project deleted successfully!');
        setProjects(projects.filter(project => project.id !== projectId));
      } else {
        console.error('Failed to delete project:', result.error);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const renderProjects = () => {
    return projects.map(project => (
      <li key={project.id} className="project-item">
        {project.name} - {project.description}
        <Link to={`/projects/add?id=${project.id}`} className="edit-button">Edit</Link>
        <button onClick={() => handleDelete(project.id)} className="delete-button">Delete</button>
      </li>
    ));
  };

  return (
    <div className="projects-container">
      <h2 className="project-title">Projects</h2>
      <Link to="/projects/add" className="add-project-link">Add Project</Link>
      <ul className="project-list">
        {renderProjects()}
      </ul>
    </div>
  );
}

export default Projects;