import "../styles/ItemCard.css";
import axios from "axios"
import { useState, useContext, useEffect } from "react";
import ServerContext from "../contexts/serverContext";
import BtnDelete from "./BtnDelete";

const ItemCard = (props) => {
  const [errors, setErrors] = useState([]);
  const [formValue, setFormValue] = useState({ ...props.item });
  const SERVER = useContext(ServerContext);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`${SERVER}/item/` + (props.item.name !== '' ? props.item._id : ''), formValue, {
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
  
  useEffect(() => {
    if (props.item._id) {
      const btn = document.querySelector('#item-form .item-btn-delete');
      
      btn.hidden = false;
      btn.classList.remove('pos-top');
      btn.classList.add('pos-bottom');
    }
  }, []);
  
  return (
    <form id="item-form" className="item-card border-round" method="POST" onSubmit={handleSubmit}>
      <div className="item-card-textarea">
        <label className="item-card-title" htmlFor="item-name">Name: </label>
        <textarea className="item-card-text" rows="5" id="item-name" name="name" value={formValue.name} onChange={handleChange} />
        
        <label className="item-card-title" htmlFor="item-description">Description: </label>
        <textarea className="item-card-text" rows="5" id="item-description" name="description" value={formValue.description} onChange={handleChange} />
      </div>
      
      <div className="item-card-options">
        <label className="item-card-title" htmlFor="item-brand">Brand: </label>
        <input className="item-card-text" type="text" id="item-brand" name="brand" value={formValue.brand} onChange={handleChange} />
        
        <label className="item-card-title" htmlFor="item-modelNo">Model Number: </label>
        <input className="item-card-text" type="text" id="item-modelNo" name="modelNo" value={formValue.modelNo} onChange={handleChange} />
        
        <label className="item-card-title" htmlFor="item-category">Category: </label>
        <select id="item-category" name="category" value={formValue.category} onChange={handleChange}>
          {props.categories.map((category, index) => {
            return <option className="item-card-text" key={index} value={category._id}>{category.name}</option>;
          })}
        </select>
        
        <label className="item-card-title" htmlFor="item-stock">Stock: </label>
        <input className="item-card-text" type="text" id="item-stock" name="stock" value={formValue.stock} onChange={handleChange} />
        
        <label className="item-card-title" htmlFor="item-price">Price: </label>
        <input className="item-card-text" type="text" id="item-price" name="price" value={formValue.price} onChange={handleChange} />
      </div>
      
      <ul className="item-card-errors">
        {errors.map((error, index) => {
          return <li className="item-card-title" key={index}>{error}</li>
        })}
      </ul>
      
      <button className="item-card-btn" type="submit">{props.item.name !== '' ? 'Change' : 'Add'}</button>
      <BtnDelete item={props.item} back={props.back} />
    </form>
  );
}

export default ItemCard;