import React, { useState } from 'react';

const Checklist = ({ selectedOptions, setSelectedOptions }) => {
  const [countryOptions] = useState(['Egypt', 'United Kingdom', 'France', 'Germany', 'Italy', 'Russia', 'India']);
  const [languageOptions] = useState(['Arabic', 'English', 'French', 'German', 'Greek', 'Italian', 'Russian', 'Sanskrit']);
  const [pagesOptions] = useState(['0-150', '151-300', '300-500', '500<']);
  const [priceOptions] = useState(['>150', '151-300', '300<']);

  
  const handleOptionSelect = (optionType, selectedOption) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [optionType]: selectedOption,
    }));
  };

  const isPageInRange = (bookPages, option) => {
    if (option === '500<') {
      return bookPages >= 500;
    }

    const [min, max] = option.split('-').map((val) => parseInt(val, 10));
    return bookPages >= min && bookPages <= max;
  };

  const isPriceInRange = (bookPrice, option) => {
    if (option === '300<') {
      return bookPrice >= 300;
    }

    const [min, max] = option.split('-').map((val) => parseInt(val, 10));
    return bookPrice >= min && bookPrice <= max;
  };
  const handleDropdownChange = (optionType, selectedOption) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [optionType]: selectedOption !== 'All' ? [selectedOption] : [],
    }));
  };
 return (
    <div className="checklist-container">
      <div className="checklist-group">
        <h3>Country</h3>
        <select
          value={selectedOptions.country.length === 1 ? selectedOptions.country[0] : 'All'}
          onChange={(e) => handleDropdownChange('country', e.target.value)}
        >
          <option value="All">All</option>
          {countryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="checklist-group">
        <h3>Language</h3>
        <select
          value={selectedOptions.language.length === 1 ? selectedOptions.language[0] : 'All'}
          onChange={(e) => handleDropdownChange('language', e.target.value)}
        >
          <option value="All">All</option>
          {languageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="checklist-group">
        <h3>Pages</h3>
        <select
          value={selectedOptions.pages.length === 1 ? selectedOptions.pages[0] : 'All'}
          onChange={(e) => handleDropdownChange('pages', e.target.value)}
        >
          <option value="All">All</option>
          {pagesOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="checklist-group">
        <h3>Price</h3>
        <select
          value={selectedOptions.price.length === 1 ? selectedOptions.price[0] : 'All'}
          onChange={(e) => handleDropdownChange('price', e.target.value)}
        >
          <option value="All">All</option>
          {priceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Checklist;
