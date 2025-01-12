import React from "react";

import AppTextInput from "./text-input";
import NumberInput from "./number-input";

import { DefaultControllerProps, TextInputProps } from "../../types/form";
import AppSelectInput from "./select-input";
import AppSwitchInput from "./switch-input";
import AppDatePicker from "./date-input";
import AppAmountInput from "./amount-input";

// ==============================|| FORM CONTROLLER  ||============================== //

// default controller to render form element based on switch case and props provided
export default function FormController(props: DefaultControllerProps) {
  const { control } = props;
  switch (control) {
    case "text-input":
      return <AppTextInput {...props} />;
    case "number-input":
      return <NumberInput {...props} />;
    case "select-input":
      return <AppSelectInput {...props} />;
    case "switch-input":
      return <AppSwitchInput {...props} />;
    case "date-input":
      return <AppDatePicker {...props} />;
    case "amount-input":
      return <AppAmountInput {...props} />;

    // case 'sip-number-input':
    //   return <SIPNumberInput {...props} />

    // case 'date-time-input':
    //   return <DateTimePickerInput {...props} />
    // case 'year-input':
    //   return <YearPickerInput {...props} />

    // case 'multiselect-input':
    //   return <MultiComboboxInput {...props} />
    // case 'textarea-input':
    //   return <TextareaInput {...props} />

    // case 'checkbox-input':
    //   return <CheckBoxInput {...props} />
    // case 'radio-input':
    //   return <RadioInput {...props} />

    default:
      return null;
  }
}
