import styles from "./RadioImage.module.css";
import clsx from "clsx";

interface IRadioImage {
  id: string;
  name: string;
  img: string;
  width?: string;
  height?: string;
  label?: string;
  className?: string;
  value: string;
  checked?: boolean;
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioImage({
  id = "",
  name,
  img,
  width,
  height,
  label,
  className,
  value = "",
  checked,
  callback,
}: IRadioImage) {
  return (
    <label
      className={clsx(styles.radioImage, checked && "is-active", className)}
    >
      {label ? `${label}` : ""}
      <input type="radio" name={name} value={id} onChange={callback} />

      <img
        src={img}
        alt={label}
        width={width ? width : ""}
        height={height ? height : ""}
      />
    </label>
  );
}
