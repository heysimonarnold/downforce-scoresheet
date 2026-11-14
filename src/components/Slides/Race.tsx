import { useDispatch } from "react-redux";
import { nextSlide } from "../UI/Wizard/wizardSlice";
import Slide from "../UI/slide/Slide";
import Instructions from "../UI/instructions/Instructions";
import { Btn } from "../UI/btn/Btn";

interface SlideRaceProps {
  instructions?: string;
  btnText?: string;
}

export default function SlideRace({
  instructions = "",
  btnText = "",
}: SlideRaceProps) {
  const dispatch = useDispatch();

  return (
    <Slide>
      <Instructions text={instructions} />
      <Btn
        text={btnText}
        theme="yellow"
        callback={() => dispatch(nextSlide())}
      />
    </Slide>
  );
}
