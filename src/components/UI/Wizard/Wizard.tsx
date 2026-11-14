import { useSelector } from "react-redux";
import { wizardSlideIndex } from "./wizardSlice";
import styles from "./Wizard.module.css";

interface WizardProps {
  slidesTotal: number;
  children: React.ReactNode;
  className?: string;
}

export default function Wizard({
  slidesTotal = 0,
  children = null,
  className = "",
}: WizardProps) {
  const slideIndex = useSelector(wizardSlideIndex);
  const wizardWidth: string = `${slidesTotal * 100}%`;
  const wizardTranslateX: string = `${(slideIndex / slidesTotal) * -100}%`;

  return (
    <div
      className={`${styles.wizard} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${slidesTotal}, 1fr)`,
        width: wizardWidth,
        transform: `translateX(${wizardTranslateX})`,
      }}
    >
      {children}
    </div>
  );
}
