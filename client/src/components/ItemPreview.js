import '../styles/ItemPreview.css';

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
      <button className="item-btn-delete" hidden={true} type="button" onClick={(e) => props.deleteItem(e, props.item)}>
        <img src={props.IconDelete} alt="Delete item" />
      </button>
    </li>
  );
}

export default ItemPreview;