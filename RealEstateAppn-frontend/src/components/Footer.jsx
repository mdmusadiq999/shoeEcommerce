import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer container-fluid">
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-md-2 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="links">Home</Link></li>
              <li><Link to="/shop" className="links">Shop</Link></li>
              <li><Link to="/contact" className="links">Contact Us</Link></li>
              <li><Link to="/faq" className="links">FAQ</Link></li>
            </ul>
          </div>
          <div className="col-md-2 mb-4">
            <h5>Categories</h5>
            <ul className="list-unstyled">
              <li><Link to="/men" className="links">Men</Link></li>
              <li><Link to="/women" className="links">Women</Link></li>
              <li><Link to="/kids" className="links">Kids</Link></li>
              <li><Link to="/sale" className="links">Sale</Link></li>
            </ul>
          </div>
          <div className="col-md-2 mb-4">
            <h5>Legal</h5>
            <ul className="list-unstyled">
              <li><Link to="/privacy-policy" className="links">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="links">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Mail Us:</h5>
            <p>support@shoestore.com</p>
            <div className="icon-container">
              <i className="fa fa-facebook-square icon" style={{ fontSize: '24px' }}></i>
              <i className="fa fa-instagram icon" style={{ fontSize: '24px' }}></i>
              <i className="fa fa-twitter-square icon" style={{ fontSize: '24px' }}></i>
            </div>
          </div>
          <div className="col-md-3">
            <h5>Registered Address</h5>
            <p>
              123 Shoe St, Fashion District, Los Angeles, CA 90015
            </p>
          </div>
          <div className="col-12">
            <hr className="footer-hr" />
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <p className="footer-text">© {new Date().getFullYear()} ShoeStore. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
