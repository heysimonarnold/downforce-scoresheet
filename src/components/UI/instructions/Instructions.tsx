import styles from "./Instructions.module.css";

function Instructions({ text }: { text: string }) {
  if (text?.trim().length === 0) return null;

  return <p className={styles.instructions}>{text}</p>;
}

export default Instructions;
