import { formatMoney, getCarTheme } from "../../helpers";
import { useContext } from "react";
import AppContext from "../../../store/app-context";
import styles from "./CarSummary.module.css";
import { CarSummaryProps } from "./types";

export const CarSummary = ({
  pos,
  car,
  status,
  money = 0,
}: CarSummaryProps) => {
  const appCtx = useContext(AppContext);
  const position = pos ? appCtx.getTranslation(`position${pos}`) : null;
  const name = appCtx.getTranslation(`car${appCtx.theme}[${car}]`);
  const theme = getCarTheme(car);

  return (
    <div
      className={`${styles.carModule} ${theme} ${status !== null && status}`}
    >
      <div className={styles.wrapper}>
        {name && (
          <div className={styles.title}>
            {position && <span className={styles.pos}>{position}</span>}
            <span className={styles.name}>{name}</span>
          </div>
        )}
        <div className={styles.money}>{formatMoney(money)}</div>
      </div>
    </div>
  );
};
