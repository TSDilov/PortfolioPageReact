const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3001;
app.use(cors());

app.use(bodyParser.json());

app.get('/api/projects', (req, res) => {
    const projectsData = JSON.parse(fs.readFileSync('public/projects/projects.json', 'utf8'));
    res.json(projectsData);
});

app.get('/api/projects/:id', (req, res) => {
    try {
      const filePath = 'public/projects/projects.json';
  
      if (fs.existsSync(filePath)) {
        const projectsData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const projectId = parseInt(req.params.id);
  
        const project = projectsData.find((p) => p.id === projectId);
  
        if (project) {
          res.json(project);
        } else {
          res.status(404).json({ error: 'Project not found' });
        }
      } else {
        res.status(404).json({ error: 'Projects data file not found' });
      }
    } catch (error) {
      console.error('Error fetching project data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
app.post('/api/projects', (req, res) => {
  try {
    const projectsData = JSON.parse(fs.readFileSync('public/projects/projects.json', 'utf8'));
    const newProject = req.body;

    const lastProject = projectsData[projectsData.length - 1];
    const newProjectId = lastProject ? lastProject.id + 1 : 1;

    newProject.id = newProjectId;
    projectsData.push(newProject);

    fs.writeFileSync('public/projects/projects.json', JSON.stringify(projectsData, null, 2));

    res.json({ success: true, data: projectsData });
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.put('/api/projects/:id', (req, res) => {
    const projectsData = JSON.parse(fs.readFileSync('public/projects/projects.json', 'utf8'));
    const projectId = parseInt(req.params.id);
  
    const existingProjectIndex = projectsData.findIndex((p) => p.id === projectId);
  
    if (existingProjectIndex !== -1) {
      const updatedProject = req.body;
      updatedProject.id = projectId;
  
      projectsData[existingProjectIndex] = updatedProject;
  
      fs.writeFileSync('public/projects/projects.json', JSON.stringify(projectsData, null, 2));
  
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
});

app.delete('/api/projects/:id', (req, res) => {
    const projectId = parseInt(req.params.id);

  try {
    const projectsData = JSON.parse(fs.readFileSync('public/projects/projects.json', 'utf8'));

    const projectIndex = projectsData.findIndex(project => project.id === projectId);

    if (projectIndex !== -1) {
      projectsData.splice(projectIndex, 1);

      fs.writeFileSync('public/projects/projects.json', JSON.stringify(projectsData, null, 2));

      res.json({ success: true, data: projectsData });
    } else {
      res.status(404).json({ success: false, error: 'Project not found' });
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});