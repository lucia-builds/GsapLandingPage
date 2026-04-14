import React from 'react';

export default function Footer() {
  return (
    <footer className="sticky-footer">
      <div className="footer-content">
        
        {/* Top Section of Footer */}
        <div className="footer-top">
          <div>
            <h3>Have an idea?</h3>
            <a href="mailto:hello@agency.com" className="footer-email">
              Let's build it together &rarr;
            </a>
          </div>
          <div className="footer-links">
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Awwwards</a></li>
            </ul>
          </div>
        </div>

        {/* Big Awwwards Style Typography at the bottom */}
        <div className="footer-bottom">
          <h1 className="footer-huge-text">AGENCY©</h1>
          <p>2026 Edition — All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}