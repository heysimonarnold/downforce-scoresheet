import { useDispatch, useSelector } from "react-redux";
import { nextSlide } from "../../UI/Wizard/wizardSlice";
import Slide from "../../UI/slide/Slide";
import SelectCarPosition from "../../UI/select-car-position/SelectCarPosition";
import Instructions from "../../UI/instructions/Instructions";
import { Btn } from "../../UI/btn/Btn";
import { finishLineArr } from "./finishLineSlice";
import { useContext } from "react";
import AppContext from "../../../store/app-context";

interface SlideFinishLineProps {
  cars: string[];
}

export default function SlideFinishLine({ cars = [] }: SlideFinishLineProps) {
  const dispatch = useDispatch();
  const appCtx = useContext(AppContext);
  const finishLine = useSelector(finishLineArr);
  const firstPos = finishLine[0];
  const btnIsDisabled = firstPos === null;

  const handleCompleted = () => dispatch(nextSlide());

  return (
    <Slide
      header={
        <Instructions text={appCtx.getTranslation("finishlineInstructions")} />
      }
      footer={
        <Btn
          text={appCtx.getTranslation("finishlineBtn")}
          disabled={btnIsDisabled}
          callback={handleCompleted}
        />
      }
    >
      {cars.map((car, index) => (
        <SelectCarPosition key={car} cars={cars} index={index} />
      ))}
    </Slide>
  );
}
