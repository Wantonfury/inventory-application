import '../styles/Items.css';
import { useEffect, useState } from "react";

const Items = (props) => {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    fetch(`${props.SERVER}/items`)
      .catch(err => console.log(err))
      .then(res => res.text())
      .then(res => JSON.parse(res))
      .then(res => setItems(res));
  }, [props.SERVER]);
  
  return (
    <div className="items">
      {items.map((item, index) => {
        return <li key={index}>
          {item.name}
        </li>
      })}
    </div>
  );
}

export default Items;