import React from 'react';
import './Projects.css';

const Projects = () => {
  const [projectsData, setProjectsData] = React.useState([]);

  React.useEffect(() => {
    fetch('/projects/projects.json')
    .then(responce => responce.json())
    .then(data => setProjectsData(data))
    .catch(error => console.error('Error fetching projects data:', error));
  }, [])

  return (
    <div className="projects-container">
      <h2 className="project-title">Projects</h2>
      <ul className="project-list">
        {projectsData.map(project => (
          <li key={project.id} className="project-item">
            {project.name} - {project.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;