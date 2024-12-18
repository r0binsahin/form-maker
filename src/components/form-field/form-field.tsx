import { useState } from 'react';
import { Field } from '../../types/Field';

interface FormFieldProps {
  currentFieldType: string;
  onSaveField: (field: Field) => void;
}

export const FormField = ({
  currentFieldType,
  onSaveField,
}: FormFieldProps) => {
  const [label, setLabel] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [options, setOptions] = useState<string[]>(['']);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSave = () => {
    const field: Field = {
      id: Date.now(),
      type: currentFieldType,
      label,
      placeholder: currentFieldType === 'text' ? placeholder : undefined,
      options:
        currentFieldType === 'dropdown' || currentFieldType === 'radio'
          ? options
          : undefined,
    };
    onSaveField(field);
  };

  return (
    <div>
      <h1>Create {currentFieldType} Field</h1>
      <div className='field-box'>
        <input
          type='text'
          placeholder='Add a label'
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        {currentFieldType === 'text' && (
          <input
            type='text'
            placeholder='Add a placeholder'
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
          />
        )}

        {(currentFieldType === 'dropdown' || currentFieldType === 'radio') && (
          <div className='options-box'>
            <h4>Options</h4>
            {options.map((option, index) => (
              <input
                key={index}
                type='text'
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            ))}
            <button onClick={handleAddOption}>Add Option</button>
          </div>
        )}
      </div>

      <button onClick={handleSave}>Save Field</button>
    </div>
  );
};
