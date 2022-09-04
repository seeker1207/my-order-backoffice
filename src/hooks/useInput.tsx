import React, {ChangeEventHandler, useCallback, useState} from "react";

export default function useInput<T>(initialValue: T) : [T, ChangeEventHandler<HTMLInputElement>, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(initialValue);

  const handler: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setValue(event.target.value as T);
  }, []);
  return [value, handler, setValue];
}