import {
  MultiSelect,
  MultiSelectProps,
  useMultiSelect,
} from "chakra-multiselect";
import { FC, useEffect } from "react";

export const StatefulMultiSelect: FC<
  Omit<MultiSelectProps, "onChange" | "value"> &
    Partial<Pick<MultiSelectProps, "onChange" | "value">> & {
      onCallBack: Function;
    }
> = ({
  onChange: _onChange,
  value: _value,
  options: __options,
  onCallBack,
  ...props
}) => {
  const { value, options, onChange } = useMultiSelect({
    value: _value || props.single ? "" : [],
    options: __options!,
    onChange: _onChange,
  });

  useEffect(() => {
    onCallBack(value);
  }, [value]);

  return (
    <MultiSelect
      value={value}
      options={options}
      onChange={onChange}
      {...props}
    />
  );
};
