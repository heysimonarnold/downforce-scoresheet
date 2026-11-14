import { type ReactElement, useState, useContext, useMemo } from "react";
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

export default function App() {
  const appCtx = useContext(AppContext);
  const dispatch = useDispatch();
  const cars = ["black", "blue", "green", "orange", "red", "yellow"];
  const bettingPrizes = [
    [9, 6, 3],
    [6, 4, 2],
    [3, 2, 1],
  ];
  let betIndex = -1;
  const [slides, setSlides] = useState<(ReactElement | null)[]>([]);
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);

  useMemo(() => {
    const slidesTmp: (ReactElement | null)[] = data.map(
      (slide: any, index: number) => {
        const key = `slide-${index}`;
        const slideInstructions = appCtx.getTranslation(
          `${slide.id}Instructions`,
        )
          ? appCtx.getTranslation(`${slide.id}Instructions`)
          : "";
        let slideBtn = appCtx.getTranslation(`${slide.id}Btn`)
          ? appCtx.getTranslation(`${slide.id}Btn`)
          : "";

        switch (slide.type) {
          case "auction":
            return (
              <SlideAuction
                key={key}
                instructions={slideInstructions}
                cars={cars}
              />
            );
          case "race":
            return (
              <SlideRace
                key={key}
                instructions={slideInstructions}
                btnText={slideBtn}
              />
            );
          case "bet":
            betIndex++;
            return (
              <SlideBet
                key={key}
                cars={cars}
                bettingPrizes={bettingPrizes[betIndex]}
                betIndex={betIndex}
              />
            );
          case "finishline":
            return <SlideFinishLine key={key} cars={cars} />;
          case "totals":
            return (
              <SlideTotals
                key={key}
                cars={cars}
                bettingPrizes={bettingPrizes}
                restart={restart}
              />
            );
          default:
            return null;
        }
      },
    );
    setSlides(slidesTmp);
  }, [appCtx]);

  function restart() {
    dispatch(resetAuction());
    dispatch(resetBets());
    dispatch(resetFinishLine());
    dispatch(goToSlide(0));
  }

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
