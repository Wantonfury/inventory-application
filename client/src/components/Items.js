import '../styles/Items.css';
import { useEffect, useState } from "react";
import ItemPreview from './ItemPreview';
import ItemCard from './ItemCard';
import async from "async";

const Items = (props) => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  
  useEffect(() => {
    async.parallel([
      function () {
        fetch(`${props.SERVER}/items`)
          .then(res => res.text())
          .then(res => JSON.parse(res))
          .then(res => setItems(res))
          .catch(err => console.log(err))
      },
      
      function () {
        fetch(`${props.SERVER}/categories`)
          .then(res => res.text())
          .then(res => JSON.parse(res))
          .then(res => setCategories(res))
          .catch(err => console.log(err))
      }
    ]);
  }, [props.SERVER]);
  
  const renderPreview = () => {
    return (
      <ul className="items">
        {items.map((item, index) => {
          return <ItemPreview key={index} item={item} onClick={() => setSelectedItem(item)} />
        })}
      </ul>
    );
  }
  
  const renderCard = () => {
    return (
      <div className="item-cnt">
        <ItemCard item={selectedItem} categories={categories} onClick={() => setSelectedItem(null)} />
      </div>
    );
  }
  
  return selectedItem ? renderCard() : renderPreview();
}

export default Items;