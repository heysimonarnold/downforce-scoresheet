import { formatMoney } from "../../helpers";
import styles from "./MoneyTag.module.css";

export default function MoneyTag({ amount }: { amount: number }) {
  return <strong className={styles.moneyTag}>{formatMoney(amount)}</strong>;
}
