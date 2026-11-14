import { useContext } from "react";
import styles from "./SettingsPanel.module.css";
import IconBtn from "../icon-btn/IconBtn";
import CloseIcon from "../../../icons/close.svg?react";
import RadioImage from "../radio-image/RadioImage";
import AppContext from "../../../store/app-context";

interface IStyledSettingsPanel {
  visible: boolean;
  close: () => void;
}

export default function SettingsPanel({
  visible = false,
  close,
}: IStyledSettingsPanel) {
  const appCtx = useContext(AppContext);

  return (
    <div
      className={`${styles.settingsPanel} ${visible ? styles["is-visible"] : ""}`}
    >
      <div className={styles.bar}>
        <IconBtn Icon={CloseIcon} callback={close} />
      </div>

      <label className={styles.selectLang}>
        {appCtx.getTranslation("language")}
        <select
          value={appCtx.lang}
          onChange={(e) => appCtx.onToggleLang(e.target.value)}
        >
          <option value="en">English 🇬🇧</option>
          <option value="fr">Français 🇫🇷</option>
          <option value="es">Espagnol 🇪🇸</option>
          <option value="de">Deutch 🇩🇪</option>
        </select>
      </label>

      <RadioImage
        id="Classic"
        img="./img/theme-classic.webp"
        width="800"
        height="250"
        label={appCtx.getTranslation("themeClassic")}
        name="theme"
        checked={appCtx.theme === "Classic"}
        value="Classic"
        callback={(e: { target: { value: string } }) =>
          appCtx.onToggleTheme(e.target.value)
        }
      />
      <RadioImage
        id="MarioKart"
        img="./img/theme-mario-kart.webp"
        width="800"
        height="250"
        label={appCtx.getTranslation("themeMarioKart")}
        name="theme"
        checked={appCtx.theme === "MarioKart"}
        value="MarioKart"
        callback={(e: { target: { value: string } }) =>
          appCtx.onToggleTheme(e.target.value)
        }
      />
    </div>
  );
}
