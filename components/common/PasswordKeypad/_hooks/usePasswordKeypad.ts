"use client";

import { useCallback, useState } from "react";
import { KEYPAD_DATA } from "../_constants";
import { cloneDeep } from "lodash-es";

type KeypadId = (typeof KEYPAD_DATA)[number]["id"];

const usePasswordKeypad = () => {
  const [password, setPassword] = useState<string[]>([]);

  const handleInputPassword = useCallback(
    (keypadId: KeypadId) => {
      const data = cloneDeep(password);

      if (keypadId === "empty") return;

      if (keypadId !== "back") {
        if (password.length === 4) return;
        data.push(keypadId);
      }

      if (keypadId === "back") {
        if (password.length === 0) return;
        if (password.length > 0) data.pop();
      }

      setPassword(data);
    },
    [password]
  );

  console.log("입력된 패스워드", password);

  return {
    password,
    KEYPAD_DATA,
    handleInputPassword,
  };
};

export default usePasswordKeypad;
