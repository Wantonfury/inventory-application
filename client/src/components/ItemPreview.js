import '../styles/ItemPreview.css';
import BtnDelete from './BtnDelete';

const ItemPreview = (props) => {
  const showDelete = (e) => {
    e.currentTarget.querySelector('.item-btn-delete').hidden = false;
  }
  
  const hideDelete = (e) => {
    e.currentTarget.querySelector('.item-btn-delete').hidden = true;
  }
  
  return (
    <li className="item-preview border-round" onClick={props.onClick} onMouseEnter={showDelete} onMouseLeave={hideDelete}>
      <p className="item-card-title item-card-text-big">{props.item.name}</p>
      <BtnDelete item={props.item} back={props.back} />
    </li>
  );
}

export default ItemPreview;