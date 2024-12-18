import { useState } from 'react';
import { FormPreview } from '../form-preview/form-preview';
import { FormField } from '../form-field/form-field';
import { Field } from '../../types/Field';

export const FormMaker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFieldType, setCurrentFieldType] = useState('');
  const [fields, setFields] = useState<Field[]>([]);
  const [fieldToEdit, setFieldToEdit] = useState<Field | null>(null);

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
            fieldToEdit={fieldToEdit}
            onSaveField={handleSaveField}
          />
        </div>
      )}

      <div className='preview'>
        <FormPreview
          fields={fields}
          onDeleteField={handleDeleteField}
          onEditField={handleEditField}
          onReorderField={handleReorderField}
        />
      </div>
    </div>
  );
};
