import { memo, useContext } from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { getCarTheme } from "../../helpers";
import styles from "./RadioCar.module.css";
import { updateBets } from "../../Slides/Bets/betsSlice";
import AppContext from "../../../store/app-context";

interface RadioCarProps {
  id: string;
  index: number;
  currentBet: null | string;
}

function RadioCar({ id, index, currentBet }: RadioCarProps) {
  const dispatch = useDispatch();
  const appCtx = useContext(AppContext);
  const name = appCtx.getTranslation(`car${appCtx.theme}[${id}]`);
  const checked = currentBet === id;
  const theme = getCarTheme(id);

  return (
    <label
      className={clsx(styles.radioCar, checked && styles.isChecked, theme)}
    >
      <div className={styles.wrapper}>
        <input
          type="radio"
          name={`bet-${index}`}
          value={id}
          checked={checked}
          onChange={() => dispatch(updateBets({ index, car: id }))}
        />
        <div className={styles.name}>{name}</div>
      </div>
    </label>
  );
}

export default memo(RadioCar);
