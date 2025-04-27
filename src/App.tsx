import SelectBox from '../components/selectbox/SelectBox.tsx';
import { useState } from 'react';
import './App.scss';
function App() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectionChange = (newSelectedItems: string[]) => {
    setSelectedItems(newSelectedItems);
  };

  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  return (
    <div className="app-wrapper">
      <SelectBox
        options={options}
        selectedValues={selectedItems}
        onChange={handleSelectionChange}
      />
    </div>
  );
}

export default App;
