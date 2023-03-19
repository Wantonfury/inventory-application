import "../styles/BtnDelete.css";
import IconDelete from '../images/icon-delete.svg';
import axios from "axios";
import ServerContext from "../contexts/serverContext";
import { useContext } from 'react';

const BtnDelete = (props) => {
  const SERVER = useContext(ServerContext);
  
  const deleteItem = (e, item) => {
    e.stopPropagation();
    
    axios.post(`${SERVER}/delete_item/${item._id}`)
      .then(() => {
        if (props.back) props.back();
      })
      .catch(err => console.log(err));
  }
  
  return (
    <button className="item-btn-delete pos-top" hidden={true} type="button" onClick={(e) => deleteItem(e, props.item)}>
      <img src={IconDelete} alt="Delete item" />
    </button>
  );
}

export default BtnDelete;