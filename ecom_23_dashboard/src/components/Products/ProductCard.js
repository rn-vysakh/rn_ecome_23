import React from "react";
import { Link } from "react-router-dom";
// import { Container, Button, Row, Col } from "shards-react";
import API_URL from "../../data/ApiUrl";




const Inventory = ({ product }) => {
  const name = product.name;
  const image = product.image[0].smUrl;
  const sellingPrice = product.sellingPrice;
  const oldPrice = product.oldPrice;
  const id = product._id;
  return (
    <div className="product-style">
      <Link to={`/productdetails/${id}`}>
        <div className="product-card">
          <div className="product-card-image-div">
            <img
              src={`${API_URL.img_url}/products/${image}`}
              alt="product"
              className="product-card-image"
            />
          </div>
          <div className="product-card-details">
            <div className="product-card-name">{name}</div>
            <div className="product-card-price">
              <s>{oldPrice}</s>
              <span className="selling-price">{sellingPrice} AED</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Inventory;
