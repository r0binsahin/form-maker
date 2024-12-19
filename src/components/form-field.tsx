import { useState, useEffect } from 'react';

import { Field } from '../types/types';

interface FormFieldProps {
  currentFieldType: string;
  fieldToEdit: Field | null;
  onSaveField: (field: Field) => void;
  handleCancel: () => void;
}

type InputError = {
  label: string;
  options: string[];
};

export const FormField = ({
  currentFieldType,
  fieldToEdit,
  onSaveField,
  handleCancel,
}: FormFieldProps) => {
  const [field, setField] = useState<Field>({
    label: '',
    type: currentFieldType,
    options: [],
  });

  const [errors, setErrors] = useState<InputError>({
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

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className='p-4 bg-gray-100 rounded-lg shadow-lg md:p-6'>
      <h2 className='text-xl font-bold text-gray-800 mb-4'>
        {fieldToEdit ? 'Edit Field' : 'Add New Field'}
      </h2>

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Label:
        </label>
        <input
          type='text'
          name='label'
          value={field.label}
          onChange={handleLabelChange}
          className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        {errors.label && (
          <div className='text-sm text-red-500 mt-1'>{errors.label}</div>
        )}
      </div>

      {(field.type === 'radio' || field.type === 'dropdown') && (
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Options:
          </label>
          {field.options?.map((option, index) => (
            <div key={index} className='flex items-center gap-2 mb-2'>
              <input
                type='text'
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              {errors.options?.[index] && (
                <div className='text-sm text-red-500'>
                  {errors.options[index]}
                </div>
              )}
            </div>
          ))}
          <button
            onClick={() =>
              setField({ ...field, options: [...(field.options || []), ''] })
            }
            className='px-4 py-2 bg-blue-500 text-white text-sm rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500'
          >
            Add Option
          </button>
        </div>
      )}

      <button
        onClick={handleSave}
        className='w-full py-2 bg-green-500 text-white text-sm font-medium rounded-lg shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-500'
      >
        {fieldToEdit ? 'Save Changes' : 'Add Field'}
      </button>
      <button
        onClick={handleCancel}
        className='w-full py-2 bg-red-500 text-white text-sm font-medium rounded-lg shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-500 mt-2'
      >
        Cancel
      </button>
    </div>
  );
};
