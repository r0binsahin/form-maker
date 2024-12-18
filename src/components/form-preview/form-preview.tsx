import { Field } from '../../types/types';

interface FormPreviewProps {
  fields: Field[];
  onDeleteField: (index: number) => void;
  onEditField: (index: number) => void;
  onReorderField: (fromIndex: number, toIndex: number) => void;
  onSaveForm: () => void;
  title: string;
}

export const FormPreview = ({
  fields,
  onDeleteField,
  onEditField,
  onReorderField,
  onSaveForm,
  title,
}: FormPreviewProps) => {
  const handleMoveUp = (index: number) => {
    if (index > 0) onReorderField(index, index - 1);
  };

  const handleMoveDown = (index: number) => {
    if (index < fields.length - 1) onReorderField(index, index + 1);
  };

  return (
    <div className='p-4 md:p-8 w-full bg-[#f5e9dd] text-[#2b2b2b] flex flex-col gap-6'>
      <h2 className='text-2xl md:text-3xl font-bold text-center uppercase text-[#e85d58]'>
        Form Preview
      </h2>

      {fields.length > 0 || title ? (
        <div className='space-y-6'>
          <h3 className='text-xl md:text-2xl font-semibold'>{title}</h3>

          {fields.map((field, index) => (
            <div
              key={index}
              className='group bg-white shadow-md rounded-md p-4 flex flex-col gap-4 relative'
            >
              <label className='text-lg font-medium text-gray-700'>
                {field.label}
              </label>

              {field.type === 'text' && (
                <input
                  type='text'
                  placeholder='Type here...'
                  className='border border-gray-300 rounded-md p-2 w-full'
                />
              )}
              {field.type === 'checkbox' && (
                <input
                  type='checkbox'
                  className='h-5 w-5 text-[#e85d58] rounded'
                />
              )}
              {field.type === 'radio' &&
                field.options?.map((option, idx) => (
                  <div key={idx} className='flex items-center gap-2'>
                    <input
                      type='radio'
                      name={field.label}
                      id={`${field.label}-${idx}`}
                      className='h-5 w-5 text-[#e85d58] focus:ring-[#e85d58]'
                    />
                    <label
                      htmlFor={`${field.label}-${idx}`}
                      className='text-gray-700'
                    >
                      {option}
                    </label>
                  </div>
                ))}
              {field.type === 'dropdown' && (
                <select className='border border-gray-300 rounded-md p-2 w-full'>
                  {field.options?.map((option, idx) => (
                    <option key={idx}>{option}</option>
                  ))}
                </select>
              )}

              <div className='absolute inset-0 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200  text-sm top-[-40px]'>
                {fields.length > 1 && index !== 0 && (
                  <button
                    onClick={() => handleMoveUp(index)}
                    className='bg-[#e85d58] text-white px-3 py-1 rounded-md'
                  >
                    Move Up
                  </button>
                )}
                {fields.length > 1 && index !== fields.length - 1 && (
                  <button
                    onClick={() => handleMoveDown(index)}
                    className='bg-[#e85d58] text-white px-3 py-1 rounded-md'
                  >
                    Move Down
                  </button>
                )}
                <button
                  onClick={() => onEditField(index)}
                  className='bg-gray-200 text-[#2b2b2b] border border-gray-300 px-3 py-1 rounded-md'
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteField(index)}
                  className='bg-red-500 text-white px-3 py-1 rounded-md'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={onSaveForm}
            className='bg-[#e85d58] text-white text-lg font-semibold py-3 px-6 rounded-md mx-auto block'
          >
            Save Form
          </button>
        </div>
      ) : (
        <h3 className='text-center text-lg text-gray-600'>
          No preview to display yet
        </h3>
      )}
    </div>
  );
};
