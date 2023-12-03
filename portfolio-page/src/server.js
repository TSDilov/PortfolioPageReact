const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3001;
app.use(cors());

app.use(bodyParser.json());

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