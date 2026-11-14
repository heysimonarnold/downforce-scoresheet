import { useDispatch, useSelector } from "react-redux";
import { auctionObj } from "./auctionSlice";
import { nextSlide } from "../../UI/Wizard/wizardSlice";
import Slide from "../../UI/slide/Slide";
import Instructions from "../../UI/instructions/Instructions";
import RangeCarPrice from "../../UI/range-car-price/RangeCarPrice";
import { Btn } from "../../UI/btn/Btn";
import { useContext } from "react";
import AppContext from "../../../store/app-context";

interface SlideAuctionProps {
  instructions?: string;
  cars: string[];
}

export default function SlideAuction({
  instructions = "",
  cars = [],
}: SlideAuctionProps) {
  const dispatch = useDispatch();
  const appCtx = useContext(AppContext);
  const auction = useSelector(auctionObj);
  const auctionArr = Object.values(auction);
  const auctionTotal = auctionArr.length
    ? auctionArr.reduce((a, b) => a + b)
    : 0;
  const btnIsDisabled = auctionTotal === 0;

  const handleCompleted = () => dispatch(nextSlide());

  const carItems = cars.map((car: string) => (
    <RangeCarPrice key={car} id={car} />
  ));

  return (
    <Slide
      header={<Instructions text={instructions} />}
      footer={
        <Btn
          text={appCtx.getTranslation("letsRace")}
          disabled={btnIsDisabled}
          callback={handleCompleted}
        />
      }
    >
      {carItems}
    </Slide>
  );
}
