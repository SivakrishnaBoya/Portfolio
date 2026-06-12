import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>Hi, I'm Siva Krishna Boya</h1>
        <p className="subtitle">Sr. Software Developer | Full Stack Engineer</p>
        <p className="description">Building scalable enterprise applications with modern technologies. Passionate about clean code and solving complex problems.</p>
        <div className="cta-buttons">
          <a href="#projects" className="btn btn-primary">View My Work</a>
          <a href="#contact" className="btn btn-secondary">Get In Touch</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
