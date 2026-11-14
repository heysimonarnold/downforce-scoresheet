import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wizard from "../Wizard/Wizard";
import { wizardSlideIndex, prevSlide } from "../Wizard/wizardSlice";
import AppContext from "../../../store/app-context";
import SettingsIcon from "../../../icons/settings.svg?react";
import BackIcon from "../../../icons/back.svg?react";
import IconBtn from "../icon-btn/IconBtn";
import styles from "./MainHeader.module.css";
import { MainHeaderProps } from "./types";

export const MainHeader = ({
  data = [],
  openSettings,
}: MainHeaderProps): React.ReactNode => {
  const dispatch = useDispatch();
  const appCtx = useContext(AppContext);
  const slideIndex = useSelector(wizardSlideIndex);

  return (
    <div className={styles.mainHeader}>
      <picture>
        <img src="./img/downforce-logo.webp" alt="Downforce" />
      </picture>

      <nav>
        <div className="cell">
          {slideIndex > 0 && (
            <IconBtn Icon={BackIcon} callback={() => dispatch(prevSlide())} />
          )}
        </div>

        <div className={styles.title}>
          <Wizard slidesTotal={data.length} className={styles.sliderTitle}>
            {data.map((slide) => (
              <div className={styles.slideTitle} key={slide.id}>
                {appCtx.getTranslation(`${slide.id}Title`)}
              </div>
            ))}
          </Wizard>
        </div>

        <div className="cell">
          <IconBtn Icon={SettingsIcon} callback={openSettings} />
        </div>
      </nav>
    </div>
  );
};
