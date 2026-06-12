import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    { title: 'ERP Management System', tech: ['ASP.NET Core', 'SQL Server', 'Angular'] },
    { title: 'HRMS Management System', tech: ['ASP.NET Core', 'SQL Server', 'Angular'] },
    { title: 'College Grievance Portal', tech: ['ASP.NET', 'SQL Server', 'jQuery'] },
    { title: 'Online Exam Platform', tech: ['ASP.NET Core', 'WebSockets', 'SQL Server'] },
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((proj, idx) => (
            <div key={idx} className="project-card">
              <h3>{proj.title}</h3>
              <div className="tech-tags">
                {proj.tech.map((t, i) => (
                  <span key={i}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
