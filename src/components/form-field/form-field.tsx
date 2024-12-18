import { useState, useEffect } from 'react';
import { Field } from '../../types/Field';

interface FormFieldProps {
  currentFieldType: string;
  fieldToEdit: Field | null;
  onSaveField: (field: Field) => void;
}

export const FormField = ({
  currentFieldType,
  fieldToEdit,
  onSaveField,
}: FormFieldProps) => {
  const [field, setField] = useState<Field>({
    id: Date.now(),
    label: '',
    type: currentFieldType,
    placeholder: '',
    options: [],
  });

  useEffect(() => {
    if (fieldToEdit) {
      setField(fieldToEdit);
    } else {
      setField({
        id: Date.now(),
        label: '',
        type: currentFieldType,
        placeholder: '',
        options: [],
      });
    }
  }, [currentFieldType, fieldToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setField((prevField) => ({ ...prevField, [name]: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...(field.options || [])];
    updatedOptions[index] = value;
    setField((prevField) => ({ ...prevField, options: updatedOptions }));
  };

  const handleSave = () => {
    onSaveField(field); // Save the field (either add new or update)
  };

  return (
    <div>
      <h2>{fieldToEdit ? 'Edit Field' : 'Add New Field'}</h2>
      <label>
        Label:
        <input
          type='text'
          name='label'
          value={field.label}
          onChange={handleChange}
        />
      </label>

      {field.type === 'text' && (
        <label>
          Placeholder:
          <input
            type='text'
            name='placeholder'
            value={field.placeholder}
            onChange={handleChange}
          />
        </label>
      )}

      {field.type === 'radio' && (
        <div>
          <label>Options:</label>
          {field.options?.map((option, index) => (
            <div key={index}>
              <input
                type='text'
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </div>
          ))}
          <button
            onClick={() =>
              setField({ ...field, options: [...(field.options || []), ''] })
            }
          >
            Add Option
          </button>
        </div>
      )}

      {field.type === 'dropdown' && (
        <div>
          <label>Options:</label>
          {field.options?.map((option, index) => (
            <div key={index}>
              <input
                type='text'
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </div>
          ))}
          <button
            onClick={() =>
              setField({ ...field, options: [...(field.options || []), ''] })
            }
          >
            Add Option
          </button>
        </div>
      )}

      <button onClick={handleSave}>
        {fieldToEdit ? 'Save Changes' : 'Add Field'}
      </button>
    </div>
  );
};
