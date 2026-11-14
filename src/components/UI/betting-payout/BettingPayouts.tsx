import { formatMoney } from "../../helpers";
import { Fragment, useContext } from "react";
import AppContext from "../../../store/app-context";
import styles from "./BettingPayouts.module.css";
import F from "lodash/fp/F";
import MoneyTag from "../money-tag/MoneyTag";

interface BettingPayoutsProps {
  arr: number[];
  title: string;
}

export default function BettingPayouts({
  arr = [],
  title = "",
}: BettingPayoutsProps) {
  const appCtx = useContext(AppContext);

  return (
    <div className={styles.bettingPayouts}>
      <div className={styles.table}>
        <div className={styles.cell}>
          <h3 className={styles.title}>{title}</h3>
        </div>
        {arr.map((value, index) => (
          <div className={styles.cell} key={index}>
            <span className={styles.pos}>
              {appCtx.getTranslation(`position${index + 1}`)}
            </span>
            <br />
            <MoneyTag className={styles.price} amount={value} />
          </div>
        ))}
      </div>
    </div>
  );
}
