import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProject.css';

const AddProject = ({ onAddProject }) => {
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  
  const addProject = async (newProject) => {
    try {
      const response = await fetch('http://localhost:3001/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });
  
      const result = await response.json();
  
      if (result.success) {
        console.log('Project added successfully!');
      } else {
        console.error('Failed to add project:', result.error);
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProject(newProject);
    setNewProject({ name: '', description: '' });

    navigate('/projects');
  };

  return (
    <div className="add-project-container">
      <h2>Add New Project</h2>
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
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default AddProject;