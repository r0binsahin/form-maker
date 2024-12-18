import { useState } from 'react';
import { FormPreview } from '../form-preview/form-preview';
import { FormField } from '../form-field/form-field';
import { Field } from '../../types/Field';

export const FormMaker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFieldType, setCurrentFieldType] = useState('');
  const [fields, setFields] = useState<Field[]>([]);

  const handleButtonClick = (fieldType: string) => {
    setIsModalOpen(true);
    setCurrentFieldType(fieldType);
  };

  const handleSaveField = (field: Field) => {
    setFields([...fields, field]);
    setIsModalOpen(false);
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

      {isModalOpen && (
        <div className='modal'>
          <FormField
            currentFieldType={currentFieldType}
            onSaveField={handleSaveField}
          />
        </div>
      )}

      <div className='preview'>
        <FormPreview fields={fields} />
      </div>
    </div>
  );
};
