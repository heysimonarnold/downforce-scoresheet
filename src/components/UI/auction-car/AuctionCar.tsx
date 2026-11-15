import React, { useState, useEffect, useContext, JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { getCarTheme } from "../../helpers";
import Gauge from "../gauge/Gauge";
import styles from "./AuctionCar.module.css";
import { auctionObj, updateAuction } from "../../Slides/Auction/auctionSlice";
import AppContext from "../../../store/app-context";

interface AuctionCarProps {
  id: string;
}

export const AuctionCar = ({ id = "" }: AuctionCarProps): JSX.Element => {
  const dispatch = useDispatch();
  const appCtx = useContext(AppContext);
  const auction = useSelector(auctionObj);
  const name = appCtx.getTranslation(`car${appCtx.theme}[${id}]`);
  const [price, setPrice] = useState(auction[id]);
  const theme = getCarTheme(id);

  useEffect(() => setPrice(auction[id]), [auction, id]);

  useEffect(() => {
    /* Wait that the user stop changing the price before calling onBidChange */
    const timer = setTimeout(() => {
      dispatch(updateAuction({ car: id, price }));
    }, 500);

    return () => clearTimeout(timer);
  }, [price, id]);

  function handlePriceChange(val: number) {
    setPrice(val);
  }

  function toggleCar(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.checked ? 1 : 0;
    handlePriceChange(val);
  }

  return (
    <div
      key={name}
      className={clsx(styles.auctionCar, price > 0 && "is-active", theme)}
    >
      <div className={styles.wrapper}>
        <label className={styles.label}>
          <input
            checked={price > 0}
            className={styles.checkbox}
            onChange={(e) => toggleCar(e)}
            type="checkbox"
          />
          <div className={styles.name}>{name}</div>
        </label>

        <Gauge
          callback={handlePriceChange}
          disabled={price === 0}
          isActive={price > 0}
          max={6}
          min={1}
          step={1}
          value={price}
        />
      </div>
    </div>
  );
};
