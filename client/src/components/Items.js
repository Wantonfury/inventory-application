import '../styles/Items.css';
import async from "async";
import { useEffect, useState, useContext } from "react";
import ItemPreview from './ItemPreview';
import ItemCard from './ItemCard';
import ServerContext from "../contexts/serverContext";

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
  const SERVER = useContext(ServerContext);
  
  useEffect(() => {
    if (updateItems) {
      async.parallel([
        function (cb) {
          fetch(`${SERVER}/items`)
            .then(res => res.text())
            .then(res => JSON.parse(res))
            .then(res => setItems(res))
            .catch(err => console.log(err))
            .finally(() => cb());
        },
        
        function (cb) {
          fetch(`${SERVER}/categories`)
            .then(res => res.text())
            .then(res => JSON.parse(res))
            .then(res => setCategories(res))
            .catch(err => console.log(err))
            .finally(() => cb());
        }
      ], () => {
        setUpdateItems(false);
      });
    }
  }, [SERVER, updateItems]);
  
  useEffect(() => {
    if (categories.length > 0) dummyItem.category = categories[0]._id
  }, [categories]);
  
  const returnAndUpdate = () => {
    setUpdateItems(true);
    setSelectedItem(null);
  }
  
  const renderPreview = () => {
    return (
      <ul className="items">
        {items.map((item, index) => {
          return <ItemPreview key={index} item={item} onClick={() => setSelectedItem(item)} back={returnAndUpdate} />
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
        <ItemCard item={selectedItem} categories={categories} back={returnAndUpdate} />
        <button className="item-card-btn" type="button" onClick={returnAndUpdate}>Back</button>
      </div>
    );
  }
  
  const renderLoading = () => {
    return (
      <div className="items center-children">
        <div className="item-preview border-round">
          <p className="item-card-title item-card-text-big">Loading...</p>
        </div>
      </div>
    );
  }
  
  return updateItems ? renderLoading() : (selectedItem ? renderCard() : renderPreview());
}

export default Items;