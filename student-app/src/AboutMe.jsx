import React from 'react';
import './App.css';
import { Card } from './Components/Card';
import viteLogo from './assets/vite.svg';
import reactLogo from './assets/react.svg';
function AboutMe() {
  return (
    <section id="next-steps">
      <div id="docs">
        <svg className="icon" role="presentation" aria-hidden="true">    
        </svg>
        <h2>FaQ</h2>
        <p>Your questions, answered</p>
        <ul>
          
        </ul>
      </div>
      <div id="social">
        <svg className="icon" role="presentation" aria-hidden="true">
          <use href="/icons.svg#social-icon"></use>
        </svg>
        <h2>Connect with me</h2>
        <p>Let's stay in touch and share our learning journeys!</p>
        <ul>
          <li>
            <a href="https://github.com/Reuelbelizaire" target="_blank">
              <svg
                className="button-icon"
                role="presentation"
                aria-hidden="true"
              >
                <use href="/icons.svg#github-icon"></use>
              </svg>
              GitHub
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/reuel-belizaire-1b49ab261/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BrrMjGRT6RAydh%2Br0s5uoMA%3D%3D" target="_blank">
              <svg
                className="button-icon"
                role="presentation"
                aria-hidden="true"
              >
                <use href="/icons.svg#linkedin-icon"></use>
              </svg>
              Linkedin
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default AboutMe