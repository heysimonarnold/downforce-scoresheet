import { formatMoney } from "../../helpers";
import styles from "./MoneyTag.module.css";

export default function MoneyTag({
  amount,
  className,
}: {
  amount: number;
  className?: string;
}) {
  return (
    <strong className={`${styles.moneyTag} ${className}`}>
      {formatMoney(amount)}
    </strong>
  );
}
