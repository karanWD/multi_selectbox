import React, { useState, useEffect, useRef } from 'react';
import styles from './SelectBox.module.scss';

interface MultiSelectProps {
  options: string[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
}

const SelectBox: React.FC<MultiSelectProps> = ({ options, selectedValues, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const selectRef = useRef<HTMLDivElement>(null);

  // Manage clicking outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Handle input changes and filter options
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setFilteredOptions(
      options.filter((option) => option.toLowerCase().includes(e.target.value.toLowerCase())),
    );
  };

  // Handle adding a new option when Enter is pressed
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const newOption = inputValue.trim();
      if (!options.includes(newOption) && !selectedValues.includes(newOption)) {
        onChange([...selectedValues, newOption]);
      }
      setInputValue('');
    }
  };

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle selection of an option
  const handleOptionClick = (option: string) => {
    if (!selectedValues.includes(option)) {
      onChange([...selectedValues, option]);
    }
  };

  // Handle removing a selected option
  const handleRemoveSelection = (option: string) => {
    onChange(selectedValues.filter((value) => value !== option));
  };

  return (
    <div className={styles['container']} ref={selectRef}>
      <div className={styles['input-container']} onClick={toggleDropdown}>
        <div className={styles['selected-values']}>
          {selectedValues.map((value) => (
            <span key={value} className={styles['selected-item']}>
              {value}
              <button
                className={styles['remove-item']}
                onClick={() => handleRemoveSelection(value)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          className={styles['input']}
          placeholder="Type to add or select..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      {isOpen && (
        <div className={styles['dropdown']}>
          {filteredOptions.length === 0 && inputValue && (
            <div className="multi-select__new-option" onClick={() => handleOptionClick(inputValue)}>
              Add "{inputValue}"
            </div>
          )}
          {filteredOptions.map((option) => (
            <div
              key={option}
              className="multi-select__option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectBox;
