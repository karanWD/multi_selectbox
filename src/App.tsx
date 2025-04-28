import SelectBox from '../components/selectbox/SelectBox.tsx';
import { useState } from 'react';
import './App.scss';

const DEFAULT_OPTIONS = ['Education', 'Yeeeah, science!', 'Art', 'Sport', 'Games', 'Health'];
function App() {
  const [list, setList] = useState<string[]>([]);
  const selectHandler = (value: string[]) => {
    setList(value);
  };
  return (
    <div className="app-wrapper">
      <SelectBox
        label={'Multi Select Box'}
        options={DEFAULT_OPTIONS}
        selected={list}
        onSelect={selectHandler}
      />
    </div>
  );
}

export default App;
