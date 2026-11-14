import { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import AppContext from "../../store/app-context";
import { Btn } from "../UI/btn/Btn";
import { CarSummary } from "../UI/car-summary/CarSummary";
import { CategorySummary } from "../UI/category-summary/CategorySummary";
import MoneyTag from "../UI/money-tag/MoneyTag";
import Slide from "../UI/slide/Slide";
import { auctionObj } from "./Auction/auctionSlice";
import { betsArr } from "./Bets/betsSlice";
import { finishLineArr } from "./FinishLine/finishLineSlice";

interface SlideTotalsProps {
  cars: string[];
  bettingPrizes: number[][];
  restart: () => void;
}

interface SummaryEntry {
  key: string;
  car: string;
  pos?: number | null;
  money: number;
  status?: string | null;
}

const RACING_PRIZES = [12, 9, 6, 4, 2, 0];

export default function SlideTotals({
  cars,
  bettingPrizes,
  restart,
}: SlideTotalsProps) {
  const appCtx = useContext(AppContext);
  const auction = useSelector(auctionObj);
  const bets = useSelector(betsArr);
  const finishLine = useSelector(finishLineArr);

  const {
    racingDetails,
    racingTotal,
    bettingDetails,
    bettingTotal,
    auctionDetails,
    auctionTotal,
  } = useMemo(() => {
    const classifiedCars = finishLine.filter(
      (car): car is string => car !== null,
    );
    const classifiedSet = new Set(classifiedCars);
    const finalRanking = [
      ...classifiedCars,
      ...cars.filter((car) => !classifiedSet.has(car)),
    ];

    let racingTotal = 0;
    const racingDetails: SummaryEntry[] = finalRanking.map((car, index) => {
      const abandoned = index >= classifiedCars.length;
      if (abandoned) {
        return {
          key: `racing-${car}`,
          car,
          pos: null,
          money: 0,
          status: "abandoned",
        };
      }

      const money = RACING_PRIZES[index] ?? 0;
      const isActive = auction[car] > 0;
      if (isActive) {
        racingTotal += money;
      }

      return {
        key: `racing-${car}`,
        car,
        pos: index + 1,
        money,
        status: isActive ? "is-active" : null,
      };
    });

    let bettingTotal = 0;
    const bettingDetails: SummaryEntry[] = [];
    bets.forEach((car, index) => {
      if (car === null) {
        return;
      }

      const position = finishLine.indexOf(car);
      const money = bettingPrizes[index]?.[position] ?? 0;
      bettingTotal += money;
      bettingDetails.push({
        key: `bet-${index}`,
        car,
        money,
        status: "is-active",
      });
    });

    const auctionEntries = Object.entries(auction);
    const auctionTotal = auctionEntries.reduce(
      (total, [, price]) => total - price,
      0,
    );
    const auctionDetails: SummaryEntry[] = auctionEntries.flatMap(
      ([car, price]) => {
        if (price <= 0) {
          return [];
        }

        return [
          {
            key: `auction-${car}`,
            car,
            money: -price,
            status: "is-active",
          },
        ];
      },
    );

    return {
      racingDetails,
      racingTotal,
      bettingDetails,
      bettingTotal,
      auctionDetails,
      auctionTotal,
    };
  }, [auction, bets, bettingPrizes, cars, finishLine]);

  return (
    <Slide
      footer={
        <>
          <h3>{appCtx.getTranslation("totalWinning")}</h3>
          <MoneyTag amount={racingTotal + bettingTotal + auctionTotal} />
          <Btn text={appCtx.getTranslation("restart")} callback={restart} />
        </>
      }
    >
      <CategorySummary
        title={appCtx.getTranslation("racingPayouts")}
        label={appCtx.getTranslation("racingTotal")}
        details={racingDetails.map(({ key, ...entry }) => (
          <CarSummary key={key} {...entry} />
        ))}
        total={racingTotal}
      />

      <CategorySummary
        title={appCtx.getTranslation("bettingPayouts")}
        label={appCtx.getTranslation("bettingTotal")}
        details={bettingDetails.map(({ key, ...entry }) => (
          <CarSummary key={key} {...entry} />
        ))}
        total={bettingTotal}
      />

      <CategorySummary
        title={appCtx.getTranslation("auctionPrice")}
        label={appCtx.getTranslation("auctionTotal")}
        details={auctionDetails.map(({ key, ...entry }) => (
          <CarSummary key={key} {...entry} />
        ))}
        total={auctionTotal}
      />
    </Slide>
  );
}
