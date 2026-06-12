import React from 'react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      title: 'Sr. Software Developer',
      company: '9Pack Software Solutions Pvt Ltd',
      period: 'MAY 2024 - PRESENT',
      desc: 'Developed scalable REST APIs using ASP.NET Core. Implemented role-based access control and JWT authentication. Optimized database queries and deployed on Azure.'
    },
    {
      title: 'Software Developer',
      company: 'Ainta Info Solutions Pvt Ltd',
      period: 'MAY 2023 - MAY 2024',
      desc: 'Built backend services using ASP.NET Core Web API. Worked on payroll processing and employee management modules. Performed SQL Server optimization and query tuning.'
    },
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2>Experience</h2>
        <div className="timeline">
          {experiences.map((exp, idx) => (
            <div key={idx} className="exp-item">
              <h3>{exp.title}</h3>
              <p className="company">{exp.company}</p>
              <p className="period">{exp.period}</p>
              <p className="desc">{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
