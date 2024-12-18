import { useState } from 'react';
import { FormPreview } from '../form-preview/form-preview';
import { FormField } from '../form-field/form-field';
import { Field, Form } from '../../types/types';

export const FormMaker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFieldType, setCurrentFieldType] = useState('');
  const [fields, setFields] = useState<Field[]>([]);
  const [fieldToEdit, setFieldToEdit] = useState<Field | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleButtonClick = (fieldType: string) => {
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

  const handleSaveForm = async () => {
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

      const data = await response.json();
      setMessage('Form saved successfully!');
      console.log('Form saved successfully:', data);

      setFormTitle('');
      setFields([]);
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };
  const handleSaveTitle = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='container'>
      <h1>Form Maker</h1>

      <div className='btn-box'>
        <h3>Add a new field</h3>
        <div className='wrapper'>
          <button onClick={() => handleButtonClick('title')}>Form title</button>
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
          {currentFieldType === 'title' ? (
            <div>
              <h2>Create and Save Title Here</h2>
              <input
                type='text'
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder='Enter form title'
              />
              <button onClick={handleSaveTitle}>Save Title</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          ) : (
            <FormField
              currentFieldType={currentFieldType}
              fieldToEdit={fieldToEdit}
              onSaveField={handleSaveField}
            />
          )}
        </div>
      )}

      <div className='preview'>
        <FormPreview
          fields={fields}
          onDeleteField={handleDeleteField}
          onEditField={handleEditField}
          onReorderField={handleReorderField}
          onSaveForm={handleSaveForm}
          title={formTitle}
        />
        {message && <div className='message'>{message}</div>}
      </div>
    </div>
  );
};
