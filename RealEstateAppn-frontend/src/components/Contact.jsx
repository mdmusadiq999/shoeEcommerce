import React from "react";

const Contact = () => {
  return (
    <div className="container">
      <div className="title">
        <h1 style={{ textAlign: "center" }}>Get in Touch</h1>
      </div>
      <div className="content">
        <h2>Our Stores</h2>
        <span>
          <b>New York</b>: ShoeStore Inc, 5th Avenue, Manhattan, NY 10001
          <br />
          Tel: +91 1234567890
        </span>
        <br />
        <span>
          <b>Los Angeles</b>: ShoeStore Inc, Rodeo Drive, Beverly Hills, CA 90210
          <br />
          Tel: +91 1234567890
        </span>
        <br />
        <span>
          <b>Chicago</b>: ShoeStore Inc, Michigan Avenue, Chicago, IL 60611
          <br />
          Tel: +91 1234567890
        </span>
        <br />
        <br />
        <span>Email: support@shoestore.com</span>
      </div>
    </div>
  );
};

export default Contact;
