import "../styles/ItemCard.css";

const ItemCard = (props) => {
  return (
    <form className="item-card" method="POST" action="">
      <label htmlFor="item-name">Name: </label>
      <textarea id="item-name" name="name" />
      
      <label htmlFor="item-description">Description: </label>
      <textarea id="item-description" name="description" />
      
      <label htmlFor="item-brand">Brand: </label>
      <input type="text" id="item-brand" name="brand" />
      
      <label htmlFor="item-modelNo">Model Number: </label>
      <input type="text" id="item-modelNo" name="modelNo" />
      
      <fieldset>
        <legend>Category</legend>
        {props.categories.map((category, index) => {
          return (
            <div key={index}>
              <label htmlFor={`item-category-${category.name}`}>{category.name}</label>
              <input type="checkbox" id={`item-category-${category.name}`} name="category" />
            </div>
          );
        })}
        
      </fieldset>
      
      <label htmlFor="item-stock">Stock: </label>
      <input type="text" id="item-stock" name="stock" />
      
      <label htmlFor="item-price">Price: </label>
      <input type="text" id="item-price" name="price" />
      
      <button type="submit">Change</button>
    </form>
  );
}

export default ItemCard;