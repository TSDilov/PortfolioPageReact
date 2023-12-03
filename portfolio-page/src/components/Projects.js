import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';
import AddProject from './AddProject';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/projects/projects.json') 
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects data:', error));
  }, []);

  const renderProjects = () => {
    return projects.map(project => (
      <li key={project.id} className="project-item">
        {project.name} - {project.description}
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