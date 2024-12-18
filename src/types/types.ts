export type Field = {
  id: number;
  type: string;
  placeholder?: string;
  label: string;
  options?: string[];
};

export type Form = {
  title: string;
  fields: Field[];
};
