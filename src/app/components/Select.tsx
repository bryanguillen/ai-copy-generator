import ReactSelect, { Props as SelectProps, GroupBase } from 'react-select';

export interface OptionType {
  label: string;
  value: string;
}

export default function Select({
  ...props
}: SelectProps<OptionType, false, GroupBase<OptionType>>) {
  return (
    <ReactSelect
      className="react-select-container"
      classNamePrefix="react-select"
      {...props}
    />
  );
}
