import React, { useState } from 'react';
import './Main.css';
import Filter from './Filter';
import Products from './Products';
import './Responsive.css';

function Main() {
  const [filterVisible, setFilterVisible] = useState(true);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('RECOMMENDED');

  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible);
  };

  const toggleDropdown = () => {
    setSortDropdownOpen(!sortDropdownOpen);
  };

  const handleSortSelect = (sortType) => {
    setSelectedSort(sortType);
    setSortDropdownOpen(false);
  };

  return (
    <div className='mainProducts'>
      <div className='header'>
        <div className='left'>
          <h1>3425 ITEMS</h1>
          <button onClick={toggleFilterVisibility}>
            {filterVisible ? 'HIDE FILTER' : 'SHOW FILTER'}
          </button>
        </div>

        <div className='right'>
          <div className='sort-dropdown'>
            <button className='sort-button' onClick={toggleDropdown}>
              {selectedSort} <span className='arrow'><i className='fa-solid fa-angle-down'></i></span>
            </button>
            {sortDropdownOpen && (
              <ul className='dropdown-menu'>
                {['RECOMMENDED', 'NEWEST FIRST', 'POPULAR', 'PRICE : HIGH TO LOW', 'PRICE : LOW TO HIGH'].map((item) => (
                  <li
                    key={item}
                    className={item === selectedSort ? 'active' : ''}
                    onClick={() => handleSortSelect(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className='Products'>
        {filterVisible && (
          <div className='filter-container'>
            <Filter />
          </div>
        )}
        <Products
          style={{
            width: filterVisible ? 'calc(100% - 300px)' : '100%',
            display: 'grid',
            gridTemplateColumns: filterVisible ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
            gap: '20px'
          }}
        />
      </div>
    </div>
  );
}

export default Main;
