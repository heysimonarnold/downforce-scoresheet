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

interface CategoryTotals {
  entries: SummaryEntry[];
  total: number;
}

interface SlideTotalsData {
  racing: CategoryTotals;
  betting: CategoryTotals;
  auction: CategoryTotals;
}

const RACING_PRIZES = [12, 9, 6, 4, 2, 0];

function calculateRacingTotals(
  cars: string[],
  finishLine: (string | null)[],
  auction: Record<string, number>,
): CategoryTotals {
  const classifiedCars = finishLine.filter(
    (car): car is string => car !== null,
  );
  const classifiedCarsSet = new Set(classifiedCars);
  const finalRanking = [
    ...classifiedCars,
    ...cars.filter((car) => !classifiedCarsSet.has(car)),
  ];

  let total = 0;
  const entries = finalRanking.map((car, index): SummaryEntry => {
    if (index >= classifiedCars.length) {
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
      total += money;
    }

    return {
      key: `racing-${car}`,
      car,
      pos: index + 1,
      money,
      status: isActive ? "isActive" : null,
    };
  });

  return { entries, total };
}

function calculateBettingTotals(
  bets: (string | null)[],
  bettingPrizes: number[][],
  finishLine: (string | null)[],
): CategoryTotals {
  const finishPositions = new Map<string, number>();
  finishLine.forEach((car, position) => {
    if (car !== null) {
      finishPositions.set(car, position);
    }
  });

  let total = 0;
  const entries: SummaryEntry[] = [];

  bets.forEach((car, index) => {
    if (car === null) {
      return;
    }

    const position = finishPositions.get(car);
    const money =
      position === undefined ? 0 : (bettingPrizes[index]?.[position] ?? 0);
    total += money;
    entries.push({
      key: `bet-${index}`,
      car,
      money,
      status: "isActive",
    });
  });

  return { entries, total };
}

function calculateAuctionTotals(
  auction: Record<string, number>,
): CategoryTotals {
  let total = 0;
  const entries: SummaryEntry[] = [];

  Object.entries(auction).forEach(([car, price]) => {
    total -= price;

    if (price > 0) {
      entries.push({
        key: `auction-${car}`,
        car,
        money: -price,
        status: "isActive",
      });
    }
  });

  return { entries, total };
}

function renderCarSummary(entry: SummaryEntry) {
  return (
    <CarSummary
      key={entry.key}
      car={entry.car}
      pos={entry.pos}
      money={entry.money}
      status={entry.status}
    />
  );
}

export default function SlideTotals({
  cars,
  bettingPrizes,
  restart,
}: SlideTotalsProps) {
  const appCtx = useContext(AppContext);
  const auction = useSelector(auctionObj);
  const bets = useSelector(betsArr);
  const finishLine = useSelector(finishLineArr);

  const totals = useMemo<SlideTotalsData>(
    () => ({
      racing: calculateRacingTotals(cars, finishLine, auction),
      betting: calculateBettingTotals(bets, bettingPrizes, finishLine),
      auction: calculateAuctionTotals(auction),
    }),
    [auction, bets, bettingPrizes, cars, finishLine],
  );
  const totalWinnings =
    totals.racing.total + totals.betting.total + totals.auction.total;

  return (
    <Slide
      footer={
        <>
          <h3>{appCtx.getTranslation("totalWinning")}</h3>
          <MoneyTag amount={totalWinnings} />
          <Btn text={appCtx.getTranslation("restart")} callback={restart} />
        </>
      }
    >
      <CategorySummary
        title={appCtx.getTranslation("racingPayouts")}
        label={appCtx.getTranslation("racingTotal")}
        total={totals.racing.total}
      >
        {totals.racing.entries.map(renderCarSummary)}
      </CategorySummary>

      <CategorySummary
        title={appCtx.getTranslation("bettingPayouts")}
        label={appCtx.getTranslation("bettingTotal")}
        total={totals.betting.total}
      >
        {totals.betting.entries.map(renderCarSummary)}
      </CategorySummary>

      <CategorySummary
        title={appCtx.getTranslation("auctionPrice")}
        label={appCtx.getTranslation("auctionTotal")}
        total={totals.auction.total}
      >
        {totals.auction.entries.map(renderCarSummary)}
      </CategorySummary>
    </Slide>
  );
}
