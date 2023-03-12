import '../styles/ItemCard.css';

const ItemCard = (props) => {
  return (
    <li className="item-card">
      <p className="item-title">{props.item.name}</p>
    </li>
  );
}

export default ItemCard;