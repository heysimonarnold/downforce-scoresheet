import { JSX } from "react";
import styles from "./Btn.module.css";
import { BtnProps } from "./types";

export const Btn = ({
  text = "",
  theme = "red",
  callback,
  ...rest
}: BtnProps): JSX.Element => (
  <button
    className={`${styles.btn} theme-${theme}`}
    onClick={callback}
    {...rest}
  >
    {text}
  </button>
);
