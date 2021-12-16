import { ChangeEventHandler, FocusEventHandler, useState } from "react";

export const useInput = (
  initialValue: string,
  validationFunction: Function = () => true,
  inputType: string = "text"
): {
  bind: {
    value: string;
    onChange: ChangeEventHandler;
    onBlur: FocusEventHandler;
  };
  error: boolean;
} => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);
  const changeTextValue = (e: any) => {
    setValue(e.target.value);
    console.log(value);
  };
  const bind = {
    value: value,
    onChange: (e: any) => {
      switch (inputType) {
        case "text": {
          changeTextValue(e);
          break;
        }
        case "select": {
          const changeValue = (e: any) => {
            setValue(e.currentTarget.value);
            console.log(value);
          };
          changeValue(e);
          break;
        }
        default: {
          changeTextValue(e);
          break;
        }
      }
    },
    onBlur: (e: any) => {
      setError(validationFunction(e));
    },
  };
  return { bind, error };
};
