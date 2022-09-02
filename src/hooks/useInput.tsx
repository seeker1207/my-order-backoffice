import React, {ChangeEventHandler, useCallback, useState} from "react";

export default function useInput(initialValue: string | number) : [string | number, ChangeEventHandler<HTMLInputElement>, React.Dispatch<React.SetStateAction<string | number>>] {
  const [value, setValue] = useState(initialValue);

  const handler: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  return [value, handler, setValue];
}