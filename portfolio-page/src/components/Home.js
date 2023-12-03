import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to my Portfolio</h2>
      <p>Hi, I'm Tsvetelin Dilov, a passionate web developer.</p>
      <div className="logos-container">
        <img src="/images/react-logo.png" alt="React Logo" className="tech-logo" />
        <img src="/images/NET-logo.png" alt=".NET Logo" className="tech-logo" />
        <img src="/images/computer-logo.png" alt="JavaScript Logo" className="tech-logo" />
        <img src="/images/Cplus-logo.png" alt="C++ Logo" className="tech-logo" />
        <img src="/images/Csharp-logo.png" alt="C# Logo" className="tech-logo" />
        <img src="/images/js-logo.png" alt="C# Logo" className="tech-logo" />
      </div>
    </div>
  );
}

export default Home;