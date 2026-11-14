import styles from "./Slide.module.css";

interface SlideProps {
  header?: null | React.ReactNode;
  children?: null | React.ReactNode;
  footer?: null | React.ReactNode;
}

export default function Slide({ header, children, footer }: SlideProps) {
  return (
    <section className={styles.slide}>
      {header && <header>{header}</header>}
      {children && <div className={styles.body}>{children}</div>}
      {footer && <footer>{footer}</footer>}
    </section>
  );
}
