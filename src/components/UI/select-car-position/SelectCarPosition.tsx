import { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { getCarTheme } from "../../helpers";
import styles from "./SelectCarPosition.module.css";
import AppContext from "../../../store/app-context";
import {
  finishLineArr,
  updateFinishLine,
} from "../../Slides/FinishLine/finishLineSlice";

interface SelectCarPositionProps {
  index: number;
  cars: string[];
}

export default function SelectCarPosition({
  index = 0,
  cars = [],
}: SelectCarPositionProps) {
  const dispatch = useDispatch();
  const appCtx = useContext(AppContext);
  const finishLine = useSelector(finishLineArr);
  const value = finishLine[index] ?? ""; // if null or undefined, use empty string
  const [carTheme, setCarTheme] = useState(value);

  const carsNotRanked = useMemo(() => {
    return cars.filter((car) => !finishLine.includes(car) || car === carTheme);
  }, [carTheme, cars, finishLine]);

  useEffect(() => {
    const value = finishLine[index] ?? "";
    setCarTheme(value);
  }, [index, finishLine]);

  const theme = getCarTheme(carTheme);

  function handleChangeCar(id: string) {
    setCarTheme(id);
    dispatch(updateFinishLine({ index: index, car: id }));
  }

  return (
    <label className={clsx(styles.selectCarPosition, theme, "is-active")}>
      <div className={styles.wrapper}>
        <span className={styles.position}>
          {appCtx.getTranslation(`position${index + 1}`)}
        </span>
        <select
          value={carTheme}
          onChange={(event) => handleChangeCar(event.target.value)}
        >
          <option key="default" value="">
            {appCtx.getTranslation("noCar")}
          </option>

          {carsNotRanked.map((car) => (
            <option key={car} value={car}>
              {appCtx.getTranslation(`car${appCtx.theme}[${car}]`)}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}
