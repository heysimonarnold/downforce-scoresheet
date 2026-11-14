import { useCallback, useContext, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { goToSlide } from "../UI/Wizard/wizardSlice";
import data from "../../data/downforce.json";
import styles from "./App.module.css";

import SlideAuction from "../Slides/Auction/Auction";
import SlideRace from "../Slides/Race";
import SlideBet from "../Slides/Bets/Bets";
import SlideFinishLine from "../Slides/FinishLine/FinishLine";
import SlideTotals from "../Slides/Totals";
import { MainHeader } from "../UI/main-header/MainHeader";
import Wizard from "../UI/Wizard/Wizard";
import AppContext from "../../store/app-context";
import SettingsPanel from "../UI/settings-panel/SettingsPanel";
import { resetAuction } from "../Slides/Auction/auctionSlice";
import { resetBets } from "../Slides/Bets/betsSlice";
import { resetFinishLine } from "../Slides/FinishLine/finishLineSlice";

const CARS = ["black", "blue", "green", "orange", "red", "yellow"];
const BETTING_PRIZES = [
  [9, 6, 3],
  [6, 4, 2],
  [3, 2, 1],
];

export default function App() {
  const appCtx = useContext(AppContext);
  const dispatch = useDispatch();
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);

  const restart = useCallback(() => {
    dispatch(resetAuction());
    dispatch(resetBets());
    dispatch(resetFinishLine());
    dispatch(goToSlide(0));
  }, [dispatch]);

  const slides = useMemo(() => {
    let betIndex = 0;

    return data.map((slide) => {
      const instructions =
        appCtx.getTranslation(`${slide.id}Instructions`) || "";
      const buttonText = appCtx.getTranslation(`${slide.id}Btn`) || "";

      switch (slide.type) {
        case "auction":
          return (
            <SlideAuction
              key={slide.id}
              instructions={instructions}
              cars={CARS}
            />
          );
        case "race":
          return (
            <SlideRace
              key={slide.id}
              instructions={instructions}
              btnText={buttonText}
            />
          );
        case "bet": {
          const currentBetIndex = betIndex++;
          return (
            <SlideBet
              key={slide.id}
              cars={CARS}
              bettingPrizes={BETTING_PRIZES[currentBetIndex]}
              betIndex={currentBetIndex}
            />
          );
        }
        case "finishline":
          return <SlideFinishLine key={slide.id} cars={CARS} />;
        case "totals":
          return (
            <SlideTotals
              key={slide.id}
              cars={CARS}
              bettingPrizes={BETTING_PRIZES}
              restart={restart}
            />
          );
        default:
          return null;
      }
    });
  }, [appCtx, restart]);

  return (
    <div className={styles.app}>
      <MainHeader data={data} openSettings={() => setSettingsVisible(true)} />

      <div className={styles.mainContent}>
        <Wizard slidesTotal={data.length}>{slides}</Wizard>

        <SettingsPanel
          visible={settingsVisible}
          close={() => setSettingsVisible(false)}
        />
      </div>
    </div>
  );
}
