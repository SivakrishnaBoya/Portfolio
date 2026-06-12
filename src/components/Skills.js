import React from 'react';
import './Skills.css';

const Skills = () => {
  const categories = [
    { title: 'Backend', skills: ['ASP.NET Core', 'C#', 'Node.js', 'REST APIs'] },
    { title: 'Frontend', skills: ['React.js', 'Angular', 'JavaScript', 'TypeScript'] },
    { title: 'Database', skills: ['SQL Server', 'PostgreSQL', 'MongoDB', 'Entity Framework'] },
    { title: 'DevOps & Tools', skills: ['Docker', 'Git', 'Azure', 'CI/CD'] },
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2>Skills & Expertise</h2>
        <div className="skills-grid">
          {categories.map((cat, idx) => (
            <div key={idx} className="skill-card">
              <h3>{cat.title}</h3>
              <ul>
                {cat.skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
