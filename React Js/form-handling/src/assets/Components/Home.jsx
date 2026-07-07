import { useState } from "react";
import EnquiryData from "./EnquiryData";
import EnquiryForm from "./EnquiryForm";

export default function Home() {

    var userData = JSON.parse(localStorage.getItem('user_infos'));
    // const [userInformation, setUserInformation] = useState(userData ? userData : []);

    const [userInformation, setUserInformation] = useState(userData ?? []);

  return (
    <>
      <header className="navbar navbar-expand-lg navbar-dark bg-gradient" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-4" href="#home">
            <span style={{fontSize: '28px', marginRight: '10px'}}>✉️</span> EnquiryHub
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link active" href="#home">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '350px'}} className="text-white d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1 className="display-3 fw-bold mb-3">Customer Enquiry Management</h1>
          <p className="lead fs-5 mb-4">Streamline your enquiries with our modern platform</p>
          <button className="btn btn-light btn-lg px-5" style={{color: '#667eea', fontWeight: 'bold'}}>Get Started</button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-light">
        <div className="container-fluid">
          <div className="row text-center g-4">
            <div className="col-md-3">
              <div className="p-4">
                <h3 className="fw-bold text-primary" style={{fontSize: '32px'}}>256</h3>
                <p className="text-muted">Total Enquiries</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4">
                <h3 className="fw-bold" style={{color: '#667eea', fontSize: '32px'}}>128</h3>
                <p className="text-muted">Resolved</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4">
                <h3 className="fw-bold" style={{color: '#764ba2', fontSize: '32px'}}>64</h3>
                <p className="text-muted">In Progress</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4">
                <h3 className="fw-bold" style={{color: '#ff6b6b', fontSize: '32px'}}>64</h3>
                <p className="text-muted">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-fluid py-5" style={{backgroundColor: '#f8f9fa'}}>
        <div className="row g-4">
          
          {/* Enquiry Form Section */}
          <EnquiryForm userInformation={userInformation} setUserInformation={setUserInformation}/>

          {/* Enquiries Table Section */}
            <EnquiryData userInformation={userInformation}/>

        </div>
      </div>

      {/* Footer */}
      <footer style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}} className="text-white py-5 mt-5">
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-md-4 mb-3">
              <h5 className="fw-bold mb-3">✉️ EnquiryHub</h5>
              <p className="small">Efficient enquiry management for modern businesses</p>
            </div>
            <div className="col-md-4 mb-3">
              <h6 className="fw-bold mb-3">Quick Links</h6>
              <ul className="list-unstyled small">
                <li><a href="#home" className="text-white text-decoration-none">Home</a></li>
                <li><a href="#about" className="text-white text-decoration-none">About</a></li>
                <li><a href="#services" className="text-white text-decoration-none">Services</a></li>
              </ul>
            </div>
            <div className="col-md-4 mb-3">
              <h6 className="fw-bold mb-3">Contact</h6>
              <p className="small mb-1">📧 info@enquiryhub.com</p>
              <p className="small mb-1">📞 +1 (555) 123-4567</p>
              <p className="small">📍 123 Main St, City, Country</p>
            </div>
          </div>
          <hr style={{borderColor: 'rgba(255,255,255,0.2)'}} />
          <div className="row">
            <div className="col-12 text-center">
              <p className="small mb-0">&copy; 2025 EnquiryHub. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
