export type Field = {
  type: string;
  placeholder?: string;
  label: string;
  options?: string[];
};

export type Form = {
  id: number;
  title: string;
  fields: Field[];
};
