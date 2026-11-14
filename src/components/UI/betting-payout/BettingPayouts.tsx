import { formatMoney } from "../../helpers";
import { useContext } from "react";
import AppContext from "../../../store/app-context";
import styles from "./BettingPayouts.module.css";

interface BettingPayoutsProps {
  arr: any[];
  title: string;
}

export default function BettingPayouts({
  arr = [],
  title = "",
}: BettingPayoutsProps) {
  const appCtx = useContext(AppContext);

  return (
    <div className={styles.bettingPayouts}>
      <h3 className={styles.title}>{title}</h3>
      <table>
        <tbody>
          {arr.map((value: number, index: number) => (
            <tr key={value}>
              <td className={styles.pos}>
                {appCtx.getTranslation(`position${index + 1}`)}
              </td>
              <td className={styles.price}>{formatMoney(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
