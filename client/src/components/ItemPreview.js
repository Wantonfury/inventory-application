import '../styles/ItemPreview.css';

const ItemPreview = (props) => {
  return (
    <li className="item-preview" onClick={props.onClick}>
      <p className="item-title">{props.item.name}</p>
    </li>
  );
}

export default ItemPreview;