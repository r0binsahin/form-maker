import { Field } from '../../types/Field';

interface FormPreviewProps {
  fields: Field[];
}

export const FormPreview = ({ fields }: FormPreviewProps) => {
  return (
    <div>
      <h2>Form Preview</h2>
      {fields.map((field, index) => (
        <div key={index}>
          <label>{field.label}</label>
          {field.type === 'text' && (
            <input type='text' placeholder={field.placeholder} />
          )}
          {field.type === 'checkbox' && <input type='checkbox' />}
          {field.type === 'radio' &&
            field.options?.map((option, index) => (
              <div key={index}>
                <input
                  type='radio'
                  name={field.label}
                  id={`${field.label}-${index}`}
                />
                <label htmlFor={`${field.label}-${index}`}>{option}</label>
              </div>
            ))}
          {field.type === 'dropdown' && (
            <select>
              {field.options?.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
};
