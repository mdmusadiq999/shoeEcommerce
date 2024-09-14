import React from "react";

const FAQ = () => {
  return (
    <div className="container">
      <div className="title">
        <h1 style={{ textAlign: "center" }}>Frequently Asked Questions</h1>
      </div>
      <div className="content">
        <h5>How do I find the right shoe size?</h5>
        <p>
          You can use our size guide available on each product page. Simply
          measure your foot and compare it with our chart to find your perfect
          fit.
        </p>
      </div>
      <div className="content">
        <h5>Do I need an account to place an order?</h5>
        <p>
          No, you can checkout as a guest. However, creating an account allows
          you to track your order and view your purchase history.
        </p>
      </div>
      <div className="content">
        <h5>How can I track my order?</h5>
        <p>
          Once your order is shipped, you'll receive a tracking number via
          email. You can use this number on our website to track your order.
        </p>
      </div>
      <div className="content">
        <h5>Can I return or exchange my shoes?</h5>
        <p>
          Yes, we offer a 30-day return and exchange policy. Shoes must be in
          their original condition with all tags attached.
        </p>
      </div>
      <div className="content">
        <h5>What payment methods do you accept?</h5>
        <p>
          We accept all major credit cards, PayPal, and Apple Pay. We also offer
          interest-free installment plans via Afterpay.
        </p>
      </div>
      <div className="content">
        <h5>Do you ship internationally?</h5>
        <p>
          Yes, we ship to select countries worldwide. Shipping fees and times
          vary by destination and are calculated at checkout.
        </p>
      </div>
      <div className="content">
        <h5>How do I contact customer support?</h5>
        <p>
          You can reach our customer support team via email at support@shoestore.com or by calling our toll-free number.
        </p>
      </div>
    </div>
  );
};

export default FAQ;
