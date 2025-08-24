import {
  type Resolver,
  type UseFormProps,
  type UseFormReturn,
  useForm,
} from "react-hook-form";

const useAppForm = <T extends Record<string, unknown>>(
  props: Omit<UseFormProps<T>, "resolver"> & {
    defaultValues: T;
    resolver: Resolver<T>;
  },
): UseFormReturn<T> => {
  return useForm<T>({
    ...props,
    resolver: props.resolver,
  });
};

export { useAppForm };
