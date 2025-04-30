import React, { useState } from 'react';
import './Main.css';
import './Responsive.css';

function Filter() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const categories = [
    { id: 'ideal', title: 'IDEAL FOR', options: ['Men', 'Women', 'Baby & Kids'] },
    { id: 'occasion', title: 'OCCASION', options: ['Casual', 'Formal', 'Party'] },
    { id: 'work', title: 'WORK', options: ['Office', 'Home', 'Outdoor'] },
    { id: 'fabric', title: 'FABRIC', options: ['Cotton', 'Silk', 'Wool', 'Polyester'] },
    { id: 'segment', title: 'SEGMENT', options: ['Budget', 'Premium', 'Luxury'] },
    { id: 'suitable', title: 'SUITABLE FOR', options: ['Day', 'Night', 'All-day'] }
  ];

  const toggleDropdown = (id) => {
    if (openDropdown === id) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(id);
    }
  };
  
  const clearCheckboxes = (e, id) => {
    e.stopPropagation(); 
    const checkboxes = document.querySelectorAll(`.checkboxes-${id} input[type="checkbox"]`);
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  return (
    <div className='filter'>
      <div className='mainFilter'>
        <input type="checkbox" id="customizable" name="" value="" />
        <label htmlFor="customizable">Customizable</label>
      </div>
      
      {categories.map((category) => (
        <div key={category.id} className={`sub-filter ${openDropdown === category.id ? 'active' : ''}`}>
          <div onClick={() => toggleDropdown(category.id)}>
            <h1 className='ideal'>{category.title}</h1>
            <h1>ALL</h1>
          </div>
          <i 
            onClick={() => toggleDropdown(category.id)} 
            className={`fa-solid ${openDropdown === category.id ? 'fa-angle-up' : 'fa-angle-down'}`}
          ></i>
          
          {openDropdown === category.id && (
            <div className='inner-filter'>
              <p onClick={(e) => clearCheckboxes(e, category.id)}>Unselect All</p>
              <div className={`checkboxes checkboxes-${category.id}`}>
                {category.options.map((option, index) => (
                  <div key={index}>
                    <input 
                      type="checkbox" 
                      id={`${category.id}-option-${index}`} 
                      name={option} 
                      value={option} 
                    />
                    <label htmlFor={`${category.id}-option-${index}`}>{option}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Filter;