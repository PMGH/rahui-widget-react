import { Dispatch, MutableRefObject, ReactNode, SetStateAction } from "react";

type SelectProps = {
  id: string;
  name: string;
  required?: boolean;
  className?: string;
  options: ReactNode[];
  value?: string | number;
  onChange: Dispatch<SetStateAction<any>>;
  ref?: MutableRefObject<any>;
};

const Select = ({
  id,
  name,
  required = false,
  className,
  options,
  value,
  onChange,
  ref,
}: SelectProps) => (
  <select
    id={id}
    name={name}
    required={required}
    className={className}
    value={value}
    onChange={onChange}
    ref={ref}
  >
    {options}
  </select>
);

export default Select;
