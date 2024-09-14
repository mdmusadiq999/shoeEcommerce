import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

const PropertyList = () => {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await fetch("/properties.json");
        if (!response.ok) {
          throw new Error("Error fetching shoes");
        }
        const data = await response.json();
        setShoes(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching shoes. Please try again.");
        setLoading(false);
        console.error("Error fetching shoes:", error);
      }
    };

    fetchShoes();
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div
          className="text-center mx-auto mb-5 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: "600px" }}
        >
          <h1 className="mb-3">Shoe Collection</h1>
          <p>
            Explore our latest collection of stylish and comfortable shoes. 
            Whether you’re looking for casual sneakers or formal shoes, 
            we have something for everyone.
          </p>
        </div>
        <div className="row g-4">
          {loading && <p>Loading shoes...</p>}
          {error && <p className="text-danger">{error}</p>}
          {shoes.map((shoe) => (
            <div className="col-lg-4 col-md-6" key={shoe.id}>
              <div className="shoe-item rounded overflow-hidden shadow-sm">
                <div className="position-relative overflow-hidden">
                  <img className="img-fluid" src={shoe.image} alt={shoe.name} />
                  <div className="bg-dark rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                    {shoe.status}
                  </div>
                  <div className="bg-light rounded-top text-dark position-absolute start-0 bottom-0 mx-4 pt-1 px-3">
                    {shoe.brand}
                  </div>
                </div>
                <div className="p-4 pb-0">
                  <h5 className="text-success mb-3">₹{shoe.price}</h5>
                  <a className="d-block h5 mb-2" href={shoe.link}>
                    {shoe.name}
                  </a>
                  <p>
                    <i className="fa fa-tag text-success me-2"></i>
                    {shoe.category}
                  </p>
                </div>
                <div className="d-flex border-top">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-users text-success me-2"></i>
                    {shoe.sizesAvailable} Sizes Available
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-star text-success me-2"></i>
                    {shoe.rating} Stars
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
