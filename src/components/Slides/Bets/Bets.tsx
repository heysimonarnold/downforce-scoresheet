import { useDispatch, useSelector } from "react-redux";
import styles from "./Bets.module.css";
import { ISlideBetProps } from "./types";
import { nextSlide } from "../../UI/Wizard/wizardSlice";
import Slide from "../../UI/slide/Slide";
import Instructions from "../../UI/instructions/Instructions";
import RadioCar from "../../UI/radio-car/RadioCar";
import BettingPayouts from "../../UI/betting-payout/BettingPayouts";
import { Btn } from "../../UI/btn/Btn";
import { betsArr } from "./betsSlice";
import { useContext } from "react";
import AppContext from "../../../store/app-context";

function SlideBet({
  betIndex = 1,
  cars = [],
  bettingPrizes = [],
}: ISlideBetProps) {
  const dispatch = useDispatch();
  const appCtx = useContext(AppContext);
  const bets = useSelector(betsArr);
  const actualBet = bets[betIndex];
  const btnIsDisabled = actualBet === null;

  const handleCompleted = () => dispatch(nextSlide());

  const carItems = cars.map((car: string) => {
    return (
      <RadioCar key={car} id={car} index={betIndex} currentBet={actualBet} />
    );
  });

  return (
    <Slide
      header={<Instructions text={appCtx.getTranslation("betInstructions")} />}
      footer={
        <Btn
          text={appCtx.getTranslation("letsRace")}
          callback={handleCompleted}
          disabled={btnIsDisabled}
        />
      }
    >
      <div className={styles.bets}>
        <div className={styles.bettingOptions}>{carItems}</div>
        <BettingPayouts
          arr={bettingPrizes}
          title={appCtx.getTranslation("bettingPayouts")}
        />
      </div>
    </Slide>
  );
}

export default SlideBet;
