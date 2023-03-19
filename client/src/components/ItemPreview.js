import '../styles/ItemPreview.css';

const ItemPreview = (props) => {
  return (
    <li className="item-preview border-round" onClick={props.onClick}>
      <p className="item-card-title item-card-text-big">{props.item.name}</p>
    </li>
  );
}

export default ItemPreview;