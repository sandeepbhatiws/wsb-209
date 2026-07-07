import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="text-primary">📋 EnquiryHub</h5>
            <p className="small">Managing your enquiries efficiently and professionally.</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled small">
              <li><a href="#home" className="text-light text-decoration-none">Home</a></li>
              <li><a href="#about" className="text-light text-decoration-none">About</a></li>
              <li><a href="#services" className="text-light text-decoration-none">Services</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <p className="small">
              Email: info@enquiryhub.com<br/>
              Phone: +1 (555) 123-4567<br/>
              Address: 123 Main St, City, Country
            </p>
          </div>
        </div>
        <hr className="bg-secondary" />
        <div className="row">
          <div className="col-12 text-center">
            <p className="small mb-0">&copy; 2025 EnquiryHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
