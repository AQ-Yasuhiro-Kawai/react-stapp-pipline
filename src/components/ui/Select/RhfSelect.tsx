import { useCallback } from "react";
import {
  type DeepMap,
  type FieldError,
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form";
import { Select, type SelectProps } from "./index";

export type RhfSelectProps<T extends FieldValues> = SelectProps &
  UseControllerProps<T>;

export const RhfSelect = <T extends FieldValues>(props: RhfSelectProps<T>) => {
  const { name, control, selectItems } = props;

  const {
    field: { onChange, value, ...rest }, // { onChange, onBlur, value, name } がrestに入る
    formState: { errors },
  } = useController<T>({ name, control });

  const handleOnChange = useCallback(
    (selectedId: string) => {
      const selectedItem = selectItems.find((item) => item.id === selectedId);
      onChange(selectedItem);
    },
    [onChange, selectItems],
  );

  return (
    <>
      <Select
        onValueChange={handleOnChange}
        placeholder={props.placeholder ?? "選択"}
        selectItems={selectItems}
        value={value?.id}
        {...rest}
      />
      {errors[name] && (
        <span className="wrap-anywhere w-full cursor-default overflow-hidden rounded-sm bg-main-bg/80 text-left text-main-red ">
          {`${(errors[name] as DeepMap<FieldValues, FieldError>).message}`}
        </span>
      )}
    </>
  );
};
