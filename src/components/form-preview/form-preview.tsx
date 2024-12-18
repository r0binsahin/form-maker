import { Field } from '../../types/Field';

interface FormPreviewProps {
  fields: Field[];
  onDeleteField: (index: number) => void;
  onEditField: (index: number) => void;
  onReorderField: (fromIndex: number, toIndex: number) => void;
}

export const FormPreview = ({
  fields,
  onDeleteField,
  onEditField,
  onReorderField,
}: FormPreviewProps) => {
  const handleMoveUp = (index: number) => {
    if (index > 0) onReorderField(index, index - 1);
  };

  const handleMoveDown = (index: number) => {
    if (index < fields.length - 1) onReorderField(index, index + 1);
  };

  return (
    <div>
      <h2>Form Preview</h2>
      {fields.map((field, index) => (
        <div key={index} className='field-preview'>
          <label>{field.label}</label>
          {field.type === 'text' && (
            <input type='text' placeholder={field.placeholder} disabled />
          )}
          {field.type === 'checkbox' && <input type='checkbox' disabled />}
          {field.type === 'radio' &&
            field.options?.map((option, index) => (
              <div key={index}>
                <input
                  type='radio'
                  name={field.label}
                  id={`${field.label}-${index}`}
                  disabled
                />
                <label htmlFor={`${field.label}-${index}`}>{option}</label>
              </div>
            ))}
          {field.type === 'dropdown' && (
            <select disabled>
              {field.options?.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          )}

          <div className='actions'>
            {fields.length > 1 && index != 0 && (
              <button onClick={() => handleMoveUp(index)}>Move Up</button>
            )}

            {fields.length > 1 && index != fields.length - 1 && (
              <button onClick={() => handleMoveDown(index)}>Move Down</button>
            )}

            <button onClick={() => onEditField(index)}>Edit</button>
            <button onClick={() => onDeleteField(index)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};
