import "../styles/ItemCard.css";
import axios from "axios"
import { useState } from "react";

const ItemCard = (props) => {
  const [errors, setErrors] = useState([]);
  const [formValue, setFormValue] = useState({
    name: props.item.name,
    description: props.item.description,
    brand: props.item.brand,
    modelNo: props.item.modelNo,
    category: (props.item.category ? props.item.category : props.categories[0]._id),
    stock: props.item.stock,
    price: props.item.price
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`${props.SERVER}/item/` + (props.item.name !== '' ? props.item._id : ''), {
      "name": formValue.name,
      "description": formValue.description,
      "brand": formValue.brand,
      "modelNo": formValue.modelNo,
      "category": formValue.category,
      "stock": formValue.stock,
      "price": formValue.price
    }, {
      headers: {
        ContentType: "multipart/form-data"
      }
    })
    .then(res => {
      props.back();
    })
    .catch(err => {
      setErrors(err.response.data.errors);
    });
  }
  
  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    });
  }
  
  return (
    <form id="item-form" className="item-card" method="POST" onSubmit={handleSubmit}>
      <div className="item-card-textarea">
        <label htmlFor="item-name">Name: </label>
        <textarea rows="5" id="item-name" name="name" value={formValue.name} onChange={handleChange} />
        
        <label htmlFor="item-description">Description: </label>
        <textarea rows="5" id="item-description" name="description" value={formValue.description} onChange={handleChange} />
      </div>
      
      <div className="item-card-options">
        <label htmlFor="item-brand">Brand: </label>
        <input type="text" id="item-brand" name="brand" value={formValue.brand} onChange={handleChange} />
        
        <label htmlFor="item-modelNo">Model Number: </label>
        <input type="text" id="item-modelNo" name="modelNo" value={formValue.modelNo} onChange={handleChange} />
        
        <label htmlFor="item-category">Category: </label>
        <select id="item-category" name="category" value={formValue.category} onChange={handleChange}>
          {props.categories.map((category, index) => {
            return <option key={index} value={category._id}>{category.name}</option>;
          })}
        </select>
        
        <label htmlFor="item-stock">Stock: </label>
        <input type="text" id="item-stock" name="stock" value={formValue.stock} onChange={handleChange} />
        
        <label htmlFor="item-price">Price: </label>
        <input type="text" id="item-price" name="price" value={formValue.price} onChange={handleChange} />
      </div>
      
      <ul className="item-card-errors">
        {errors.map((error, index) => {
          return <li key={index}>{error}</li>
        })}
      </ul>
      
      <button type="submit">{props.item.name !== '' ? 'Change' : 'Add'}</button>
    </form>
  );
}

export default ItemCard;