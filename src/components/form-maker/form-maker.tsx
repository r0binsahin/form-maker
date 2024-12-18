import { useState } from 'react';
import { FormPreview } from '../form-preview/form-preview';

export const FormMaker = () => {
  const [isModal, setIsModal] = useState(false);
  const [fieldType, setFieldType] = useState('');

  const handleButtonClick = (fieldType: string) => {
    setIsModal(!isModal);
    setFieldType(fieldType);
  };

  return (
    <div className='container'>
      <h1>Form Maker</h1>

      <div className='btn-box'>
        <h3>Add a new field</h3>
        <div className='wrapper'>
          <button onClick={() => handleButtonClick('text')}>Text field</button>
          <button onClick={() => handleButtonClick('checkbox')}>
            Checkbox
          </button>
          <button onClick={() => handleButtonClick('radio')}>
            Radio Button
          </button>
          <button onClick={() => handleButtonClick('dropdown')}>
            Dropdown
          </button>
        </div>
      </div>

      {isModal && (
        <div className='modal'>
          <h1>I am a modal</h1>
          <p>{fieldType}</p>
        </div>
      )}

      <div className='preview'>
        <FormPreview />
      </div>
    </div>
  );
};
