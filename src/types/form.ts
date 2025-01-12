// React Node : type that represents a React element, an array of React elements, or a string, number, or boolean
import { ReactNode, CSSProperties } from "react";

// import props provided by mantine UI for text input
import {
  TextFieldProps as FormTextInputProps,
  AutocompleteProps as FormSelectInputProps,
  SwitchProps as FormSwitchProps,
  CheckboxProps as FormCheckboxProps,
  TextField,
  // RadioGroupProps as FormRadioProps,
} from "@mui/material";
import { DatePickerProps as FormDatePickerProps } from "@mui/x-date-pickers";

// pass default
export type TypeController<T> = { label: ReactNode; name: string } & T;

// export all types here like TextInput props
export type TextInputProps = TypeController<FormTextInputProps>;
export type NumberInputProps = TypeController<FormTextInputProps>;
export type SelectInputProps = TypeController<
  Omit<
    FormSelectInputProps<
      any, // Autocomplete option type
      boolean, // Allow multiple selection (false for single selection)
      false, // Disable clearable
      false // Free solo (no custom entries)
    >,
    "renderInput"
  >
>;
export type DatePickerProps = TypeController<FormDatePickerProps<any>>;
export type SwitchInputProps = TypeController<FormSwitchProps>;
export type CheckboxProps = TypeController<FormCheckboxProps>;
// export type RadioProps = TypeController<FormRadioProps>

//export default controller props
export type DefaultControllerProps =
  | ({ control: "text-input" } & TextInputProps)
  | ({ control: "amount-input" } & TextInputProps)
  | ({ control: "select-input" } & SelectInputProps)
  | ({ control: "number-input" } & NumberInputProps)
  | ({ control: "app-price-input" } & TextInputProps)
  | ({ control: "switch-input" } & SwitchInputProps)
  | ({ control: "checkbox-input" } & CheckboxProps)
  | ({ control: "date-input" } & DatePickerProps);
// | ({ control: 'radio-input'} & RadioProps)
