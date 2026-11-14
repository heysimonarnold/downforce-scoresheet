import styles from "./IconBtn.module.css";

interface IIconBtn {
  Icon: any;
  callback: () => void;
}

export default function IconBtn({ Icon, callback }: IIconBtn) {
  return (
    <button className={styles.iconBtn} onClick={callback}>
      <Icon />
    </button>
  );
}
