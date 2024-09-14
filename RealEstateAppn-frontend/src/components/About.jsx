import React from "react";

const About = () => {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
            <div className="about-img position-relative overflow-hidden p-5 pe-0">
              <img className="img-fluid w-100" src="./assets/about-shoes.jpg" alt="About our shoes"/>
            </div>
          </div>
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
            <h1 className="mb-4">Step into Comfort & Style</h1>
            <p className="mb-4">Discover the perfect blend of comfort and style with our exclusive range of shoes. Designed for every occasion, our shoes are crafted with the finest materials to ensure durability and comfort.</p>
            <p><i className="fa fa-check text-dark me-3"></i>Premium Quality Materials</p>
            <p><i className="fa fa-check text-dark me-3"></i>Stylish & Modern Designs</p>
            <p><i className="fa fa-check text-dark me-3"></i>Comfort Guaranteed</p>
            <a className="btn btn-primary py-3 px-5 mt-3" href="/shop">Shop Now</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
