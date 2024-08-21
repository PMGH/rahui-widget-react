import { ReactNode } from "react";

type SelectProps = {
  id: string;
  name: string;
  required?: boolean;
  className: string;
  options: ReactNode[];
};

const Select = ({
  id,
  name,
  required = false,
  className,
  options,
}: SelectProps) => (
  <select id={id} name={name} required={required} className={className}>
    {options}
  </select>
);

export default Select;
