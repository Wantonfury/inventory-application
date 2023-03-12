import '../styles/Items.css';
import { useEffect, useState } from "react";
import ItemCard from './ItemCard';

const Items = (props) => {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    fetch(`${props.SERVER}/items`)
      .then(res => res.text())
      .then(res => JSON.parse(res))
      .then(res => setItems(res))
      .catch(err => console.log(err));
  }, [props.SERVER]);
  
  return (
    <ul className="items">
      {items.map((item, index) => {
        return <ItemCard key={index} item={item} />
      })}
    </ul>
  );
}

export default Items;