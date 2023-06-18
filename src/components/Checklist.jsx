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
  return (
    <div className="checklist-container">
      <div className="checklist-group">
        <h3>Country</h3>
        {countryOptions.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              checked={selectedOptions.country.includes(option)}
              onChange={() => {
                const updatedOptions = selectedOptions.country.includes(option)
                  ? selectedOptions.country.filter((item) => item !== option)
                  : [...selectedOptions.country, option];
                handleOptionSelect('country', updatedOptions);
              }}
            />
            {option}
            <br/>
          </label>
        ))}
      </div>

      <div className="checklist-group">
        <h3>Language</h3>
        {languageOptions.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              checked={selectedOptions.language.includes(option)}
              onChange={() => {
                const updatedOptions = selectedOptions.language.includes(option)
                  ? selectedOptions.language.filter((item) => item !== option)
                  : [...selectedOptions.language, option];
                handleOptionSelect('language', updatedOptions);
              }}
            />
            {option}
            <br />
          </label>
        ))}
      </div>

      <div className="checklist-group">
        <h3>Pages</h3>
        {pagesOptions.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              checked={selectedOptions.pages.includes(option)}
              onChange={() => {
                const updatedOptions = selectedOptions.pages.includes(option)
                  ? selectedOptions.pages.filter((item) => item !== option)
                  : [...selectedOptions.pages, option];
                handleOptionSelect('pages', updatedOptions);
              }}
            />
            {option}
            <br />
          </label>
        ))}
      </div>

      <div className="checklist-group">
        <h3>Price</h3>
        {priceOptions.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              checked={selectedOptions.price.includes(option)}
              onChange={() => {
                const updatedOptions = selectedOptions.price.includes(option)
                  ? selectedOptions.price.filter((item) => item !== option)
                  : [...selectedOptions.price, option];
                handleOptionSelect('price', updatedOptions);
              }}
            />
            {option}
            <br />
          </label>
        ))}
      </div>
    </div>
  );
};

export default Checklist;
