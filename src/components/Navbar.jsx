import React, { useState } from 'react';
import '../components-style/navbar.css';
import { IoSearchOutline } from "react-icons/io5";
import logo from '/logo.png'
import logo_news from '/logo_news.png'

const Navbar = ({ setQuary }) => {
    const [query, setQuery] = useState('');

    const toggleQuary = (category = null) => {
        console.log("Category:", category, "Query:", query); 
        if (category) {
            console.log("Setting category:", category);
            setQuary(category);
        } else if (query.trim()) {
            console.log("Setting query:", query);
            setQuary(query); 
            setQuery(''); 
        }
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo_news} alt="logo" />
                <span>NewsApp</span>
            </div>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search for news..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && toggleQuary()} // Trigger on Enter key
                />
                <IoSearchOutline className="search-icon" onClick={() => toggleQuary()} />
            </div>
            <ul className='links'>
                <li>Home</li>
                <li className='category'>
                    Category
                <div className="category-items">
                <button onClick={()=>{toggleQuary('sorts')}}>Sports</button>
                <button onClick={()=>{toggleQuary('entertainment')}}>Entertainment</button>
                <button onClick={()=>{toggleQuary('politics')}}>Politics</button>
                <button onClick={()=>{toggleQuary('health')}}>Health</button>
                <button onClick={()=>{toggleQuary('fitness')}}>Fitness</button>
                </div>
                </li>
                
                <li>About</li>
            </ul>
        </nav>
    );
};

export default Navbar;
