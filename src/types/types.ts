export type Field = {
  type: string;
  label: string;
  options?: string[];
};

export type Form = {
  id: number;
  title: string;
  fields: Field[];
};
