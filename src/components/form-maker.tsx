import { useState } from 'react';
import { FormPreview, FormField } from '.';

import { Field, Form } from '../types/types';

export const FormMaker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFieldType, setCurrentFieldType] = useState('');
  const [fields, setFields] = useState<Field[]>([]);
  const [fieldToEdit, setFieldToEdit] = useState<Field | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [message, setMessage] = useState('');
  const [titleError, setTitleError] = useState('');

  const handleAddField = (fieldType: string) => {
    setIsModalOpen(true);
    setCurrentFieldType(fieldType);
    setFieldToEdit(null);
  };

  const handleSaveField = (field: Field) => {
    if (fieldToEdit) {
      setFields(fields.map((f) => (f === fieldToEdit ? field : f)));
    } else {
      setFields([...fields, field]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteField = (index: number) => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const handleEditField = (index: number) => {
    const fieldToEdit = fields[index];

    setIsModalOpen(true);

    setFieldToEdit(fieldToEdit);

    setCurrentFieldType(fieldToEdit.type);
  };

  const handleReorderField = (fromIndex: number, toIndex: number) => {
    setFields((prevFields) => {
      const updatedFields = [...prevFields];

      const [movedField] = updatedFields.splice(fromIndex, 1);

      updatedFields.splice(toIndex, 0, movedField);

      return updatedFields;
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormTitle(value);

    if (value.trim() === '') {
      setTitleError('Form title cannot be empty');
    } else {
      setTitleError('');
    }
  };

  const handleSaveTitle = () => {
    if (formTitle.trim() === '') {
      setTitleError('Form title cannot be empty');
      return;
    }
    setIsModalOpen(false);
  };

  const handleSaveForm = async () => {
    if (formTitle.trim() === '') {
      setTitleError('Form title cannot be empty');
      return;
    }

    const formData: Form = {
      id: Date.now(),
      title: formTitle,
      fields: fields.map((field) => {
        if (field.type === 'text') {
          const { options, ...textField } = field;
          return textField;
        }
        return field;
      }),
    };

    try {
      const response = await fetch('http://localhost:3000/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      setMessage('Form saved successfully!');

      setFormTitle('');

      setFields([]);
    } catch (error) {
      console.error('Error saving form:', error);
      setMessage('Could not save  form. Something went wrong!');
    }
  };

  return (
    <div className='p-6  mt-10 max-w-3xl mx-auto bg-white border-2 rounded-md'>
      <h1 className='text-2xl font-bold mb-4'>Form Maker</h1>

      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-2'>Add a new field</h3>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            onClick={() => handleAddField('title')}
          >
            Form Title
          </button>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            onClick={() => handleAddField('text')}
          >
            Text Field
          </button>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            onClick={() => handleAddField('checkbox')}
          >
            Checkbox
          </button>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            onClick={() => handleAddField('radio')}
          >
            Radio Button
          </button>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            onClick={() => handleAddField('dropdown')}
          >
            Dropdown
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded shadow-lg w-full max-w-md'>
            {currentFieldType === 'title' ? (
              <div>
                <h2 className='text-xl font-semibold mb-4'>
                  Create and Save Title
                </h2>
                <input
                  type='text'
                  value={formTitle}
                  onChange={handleTitleChange}
                  placeholder='Enter form title'
                  className='w-full px-4 py-2 border rounded mb-2'
                />
                {titleError && (
                  <div className='text-red-500 text-sm'>{titleError}</div>
                )}
                <div className='flex justify-end space-x-4'>
                  <button
                    className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
                    onClick={handleSaveTitle}
                  >
                    Save Title
                  </button>
                  <button
                    className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <FormField
                currentFieldType={currentFieldType}
                fieldToEdit={fieldToEdit}
                onSaveField={handleSaveField}
                handleCancel={() => setIsModalOpen(!isModalOpen)}
              />
            )}
          </div>
        </div>
      )}

      <div className='mt-6'>
        <FormPreview
          fields={fields}
          onDeleteField={handleDeleteField}
          onEditField={handleEditField}
          onReorderField={handleReorderField}
          onSaveForm={handleSaveForm}
          title={formTitle}
        />
        {message && <div className='mt-4 text-green-500'>{message}</div>}
        {titleError && <div className='mt-4 text-red-500'>{titleError}</div>}
      </div>
    </div>
  );
};
