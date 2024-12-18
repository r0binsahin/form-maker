import { useState, useEffect } from 'react';
import { Field } from '../../types/types';

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
    label: '',
    type: currentFieldType,
    options: [],
  });

  const [errors, setErrors] = useState<{
    label: string;
    options: string[];
  }>({
    label: '',
    options: [],
  });

  useEffect(() => {
    if (fieldToEdit) {
      setField(fieldToEdit);
    } else {
      setField({
        label: '',
        type: currentFieldType,
        options: [],
      });
    }
  }, [currentFieldType, fieldToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setField((prevField) => ({ ...prevField, [name]: value }));

    if (name === 'label') {
      setErrors((prev) => ({
        ...prev,
        label: value.trim() === '' ? 'Label cannot be empty' : '',
      }));
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...(field.options || [])];
    updatedOptions[index] = value;
    setField((prevField) => ({ ...prevField, options: updatedOptions }));

    const optionErrors = [...(errors.options || [])];
    optionErrors[index] = value.trim() === '' ? 'Option cannot be empty' : '';
    setErrors((prev) => ({ ...prev, options: optionErrors }));
  };

  const validateForm = () => {
    const labelError = field.label.trim() === '' ? 'Label cannot be empty' : '';

    const optionErrors =
      field.type === 'radio' || field.type === 'dropdown'
        ? field.options?.map((option) =>
            option.trim() === '' ? 'Option cannot be empty' : ''
          ) || []
        : [];

    setErrors({
      label: labelError,
      options: optionErrors,
    });

    return labelError === '' && optionErrors.every((error) => error === '');
  };

  const handleSave = () => {
    if (validateForm()) {
      onSaveField(field);
    }
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
        {errors.label && <div style={{ color: 'red' }}>{errors.label}</div>}
      </label>

      {(field.type === 'radio' || field.type === 'dropdown') && (
        <div>
          <label>Options:</label>
          {field.options?.map((option, index) => (
            <div key={index}>
              <input
                type='text'
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              {errors.options?.[index] && (
                <div style={{ color: 'red' }}>{errors.options[index]}</div>
              )}
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
