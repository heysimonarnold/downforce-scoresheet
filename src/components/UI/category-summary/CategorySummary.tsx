import { ReactElement } from "react";
import MoneyTag from "../money-tag/MoneyTag";
import styles from "./CategorySummary.module.css";

interface CategorySummaryProps {
  details?: (null | ReactElement)[];
  label?: string;
  title?: string;
  total?: number;
}

export const CategorySummary = ({
  details = [],
  label,
  title,
  total = 0,
}: CategorySummaryProps) => (
  <div className={styles.categorySummary}>
    <h3 className={styles.title}>{title}</h3>
    <div className={styles.table}>{details}</div>
    <div className={styles.footer}>
      <span className={styles.label}>{label}</span>
      <MoneyTag amount={total} />
    </div>
  </div>
);
