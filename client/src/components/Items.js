import '../styles/Items.css';
import async from "async";
import { useEffect, useState } from "react";
import ItemPreview from './ItemPreview';
import ItemCard from './ItemCard';

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
          cb(null, "items");
        },
        
        function (cb) {
          fetch(`${props.SERVER}/categories`)
            .then(res => res.text())
            .then(res => JSON.parse(res))
            .then(res => setCategories(res))
            .catch(err => console.log(err));
          cb(null, "categories");
        }
      ], (err, results) => {
        setUpdateItems(false);
      });
    }
  }, [props.SERVER, updateItems]);
  
  const returnAndUpdate = () => {
    setUpdateItems(true);
    setSelectedItem(null);
  }
  
  const renderPreview = () => {
    return (
      <ul className="items">
        {items.map((item, index) => {
          return <ItemPreview key={index} item={item} onClick={() => setSelectedItem(item)} />
        })}
        <li className="item-preview" onClick={() => setSelectedItem({})}>
          <p className="item-title">Create a new item</p>
        </li>
      </ul>
    );
  }
  
  const renderCard = () => {
    return (
      <div className="item-cnt">
        <ItemCard SERVER={props.SERVER} item={selectedItem} categories={categories} back={returnAndUpdate} />
        <button type="button" onClick={returnAndUpdate}>Back</button>
      </div>
    );
  }
  
  return selectedItem ? renderCard() : renderPreview();
}

export default Items;