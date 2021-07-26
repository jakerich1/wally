import React from "react";
import { Link } from "react-router-dom";
import './style.scss'

function Menu(props) {

    const numbers = props.wallies;
    const listItems = numbers.map((item) =>
        <div className='menu-item' key={item.id}>
            <h2>{item.title}</h2>
            <img src={item.url} alt={item.title}/>
            <Link to={`game/${item.id}`}>Start Game</Link>
        </div>
    );

  return (
    <main>
        {listItems}
    </main>
  );
}

export default Menu;
