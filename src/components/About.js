import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>I'm a results-driven Sr. Software Developer with 3+ years of experience building scalable enterprise applications. I specialize in ASP.NET Core, modern web technologies, and cloud solutions.</p>
            <p>My passion lies in writing clean, maintainable code and architecting solutions that solve real-world problems. I thrive in collaborative environments and love mentoring junior developers.</p>
          </div>
          <div className="stats">
            <div className="stat">
              <h3>3+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat">
              <h3>15+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat">
              <h3>50+</h3>
              <p>Team Members</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
