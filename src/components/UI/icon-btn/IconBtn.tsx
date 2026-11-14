import type { ComponentType, SVGProps } from "react";
import styles from "./IconBtn.module.css";

interface IIconBtn {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  callback: () => void;
}

export default function IconBtn({ Icon, callback }: IIconBtn) {
  return (
    <button className={styles.iconBtn} onClick={callback}>
      <Icon />
    </button>
  );
}
