import React, {ChangeEventHandler, useCallback, useState} from "react";

type inputType = number | string;

export default function useInput(initialValue: string) : [string, ChangeEventHandler<HTMLInputElement>, React.Dispatch<React.SetStateAction<string>>] {
  const [value, setValue] = useState(initialValue);

  const handler: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  return [value, handler, setValue];
}