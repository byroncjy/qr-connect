// Footer.js
import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
        <div className="footer-container">
            <p className="footer-text">© 2023 My App. All Rights Reserved.</p>
            <div className="footer-links">
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/terms-of-service">Terms of Service</a>
                <a href="/contact-us">Contact Us</a>
            </div>
        </div>
  )
}

export default Footer
