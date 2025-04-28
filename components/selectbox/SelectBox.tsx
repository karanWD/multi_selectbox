import { FC, useEffect, useRef, useState } from 'react';
import styles from './SelectBox.module.scss';
import CheckIcon from '../../src/icons/CheckIcon.tsx';
import ChevronDownIcon from '../../src/icons/ChevronDownIcon.tsx';

type SelectBoxProps = {
  options: string[];
  selected: string[];
  onSelect: (value: string[]) => void;
  label?: string;
};

const SelectBox: FC<SelectBoxProps> = ({ label = '', selected, options, onSelect }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [optionsList, setOptionsList] = useState<string[]>(options);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = inputRef.current?.value;
    if (e.key === 'Enter' && inputValue?.trim()) {
      if (!optionsList.includes(inputValue.trim())) {
        const newItem = inputValue.trim();
        setOptionsList((prev) => [newItem, ...prev]);
      }
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const selectHandler = (value: string) => {
    let tempList = [...selected];
    const index = tempList.indexOf(value);
    if (index > -1) {
      tempList.splice(index, 1);
    } else {
      tempList = [...tempList, value];
    }
    onSelect(tempList);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!selectRef.current) return;
      if (!selectRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, []);

  return (
    <div className={styles.selectBoxContainer} ref={selectRef}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.selectWrapper}>
        <div className={styles.inputWrapper}>
          {open ? (
            <input
              ref={inputRef}
              className={styles.input}
              type="text"
              placeholder="Type & click Enter"
              onKeyDown={handleKeyDown}
            />
          ) : (
            <div className={styles.titlesWrapper} onClick={() => setOpen((prev) => !prev)}>
              {selected.length === 0 && 'select from here'}
              {selected.length > 2 ? (
                selected.length + ' items selected'
              ) : (
                <div className={styles.titlesWrapper}>{selected.join(' , ')}</div>
              )}
            </div>
          )}
        </div>
        <div onClick={() => setOpen((prev) => !prev)} className={styles.iconWrapper}>
          <ChevronDownIcon />
        </div>
      </div>

      {open && (
        <div className={styles.dropdown}>
          {optionsList.map((option, index) => (
            <div
              key={'OPTION_ITEM_' + index}
              className={`${styles.dropdownItem} ${selected.includes(option) ? styles.selected : ''}`}
              onClick={() => selectHandler(option)}
            >
              <span className={styles.optionText}>{option}</span>
              {selected.includes(option) && (
                <div className={styles.checkIcon}>
                  <CheckIcon />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectBox;
