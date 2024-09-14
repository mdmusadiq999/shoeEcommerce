import React from 'react';
import { Link } from "react-router-dom";

function Categories() {
  return (
    <div className="container-xxl mt-0 ">
      <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
          <h1 className="mb-3">Shoe Categories</h1>
          <p>Explore our diverse range of shoe categories. Whether youre looking for something casual or formal, we have it all!</p>
        </div>
        <div className="row g-3">
          <div className="col-lg-3 col-sm-6 ">
              <Link to="/sneakers">
                <div className="cat-item d-block bg-light text-center rounded p-3">
                  <div className="rounded p-4">
                    <div className="icon mb-3">
                      <img className="img-fluid" src="/assets/sneakers.png" alt="Sneakers" />
                      <h6>Sneakers</h6>
                    </div>
                  </div>
                </div>
              </Link>
          </div>
          <div className="col-lg-3 col-sm-6 ">
              <Link to="/loafers">
                <div className="cat-item d-block bg-light text-center rounded p-3">
                  <div className="rounded p-2">
                    <div className="icon mb-3">
                      <img className="img-fluid" src="/assets/loafers.png" alt="Loafers" />
                      <h6>Loafers</h6>
                    </div>
                  </div>
                </div>
              </Link>
          </div>
          <div className="col-lg-3 col-sm-6 ">
              <Link to="/boots">
                <div className="cat-item d-block bg-light text-center rounded p-3">
                  <div className="rounded p-2">
                    <div className="icon mb-3">
                      <img className="img-fluid" src="/assets/boots.png" alt="Boots" />
                      <h6>Boots</h6>
                    </div>
                  </div>
                </div>
              </Link>
          </div>
          <div className="col-lg-3 col-sm-6 ">
              <Link to="/heels">
                <div className="cat-item d-block bg-light text-center rounded p-3">
                  <div className="rounded p-2">
                    <div className="icon mb-3">
                      <img className="img-fluid" src="/assets/heels.png" alt="Heels" />
                      <h6>Heels</h6>
                    </div>
                  </div>
                </div>
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
