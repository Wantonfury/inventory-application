import '../styles/Items.css';
import async from "async";
import { useEffect, useState } from "react";
import ItemPreview from './ItemPreview';
import ItemCard from './ItemCard';
import IconDelete from '../images/icon-delete.svg';

const dummyItem = {
  name: '',
  description: '',
  brand: '',
  modelNo: '',
  category: '',
  stock: '',
  price: ''
}

const Items = (props) => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updateItems, setUpdateItems] = useState(true);
  
  useEffect(() => {
    if (updateItems) {
      async.parallel([
        function (cb) {
          fetch(`${props.SERVER}/items`)
            .then(res => res.text())
            .then(res => JSON.parse(res))
            .then(res => setItems(res))
            .catch(err => console.log(err));
          cb();
        },
        
        function (cb) {
          fetch(`${props.SERVER}/categories`)
            .then(res => res.text())
            .then(res => JSON.parse(res))
            .then(res => setCategories(res))
            .catch(err => console.log(err));
          cb();
        }
      ], () => {
        setUpdateItems(false);
      });
    }
  }, [props.SERVER, updateItems]);
  
  useEffect(() => {
    if (categories.length > 0) dummyItem.category = categories[0]._id
  }, [categories]);
  
  const returnAndUpdate = () => {
    setUpdateItems(true);
    setSelectedItem(null);
  }
  
  const deleteItem = (e, item) => {
    e.stopPropagation();
    // delete item
    
    if (selectedItem) setSelectedItem(null);
    setUpdateItems(true);
  }
  
  const renderPreview = () => {
    return (
      <ul className="items">
        {items.map((item, index) => {
          return <ItemPreview key={index} item={item} onClick={() => setSelectedItem(item)} deleteItem={deleteItem} IconDelete={IconDelete} />
        })}
        <li className="item-preview border-round" onClick={() => setSelectedItem(dummyItem)}>
          <p className="item-card-title item-card-text-big">Create a new item</p>
        </li>
      </ul>
    );
  }
  
  const renderCard = () => {
    return (
      <div className="item-cnt">
        <ItemCard SERVER={props.SERVER} item={selectedItem} categories={categories} back={returnAndUpdate} />
        <button className="item-card-btn" type="button" onClick={returnAndUpdate}>Back</button>
      </div>
    );
  }
  
  return selectedItem ? renderCard() : renderPreview();
}

export default Items;