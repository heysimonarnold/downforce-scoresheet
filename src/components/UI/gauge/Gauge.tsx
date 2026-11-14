import { useState, useEffect } from "react";
import styles from "./Gauge.module.css";

interface GaugeProps {
  callback: (value: number) => void;
  disabled?: boolean;
  isActive?: boolean;
  max?: number;
  min?: number;
  step?: number;
  value?: number;
}

export default function Gauge({
  callback,
  disabled = false,
  isActive = false,
  max = 10,
  min = 0,
  step = 1,
  value = 0,
}: GaugeProps) {
  const [thumbPos, setThumbPos] = useState(0);

  useEffect(() => {
    setThumbPos((Math.max(0, value - min) / (max - min)) * 100);
  }, [value, min, max]);

  function handleChange(e: { target: { value: string } }) {
    const val = parseInt(e.target.value);
    callback(val);
  }

  return (
    <div className={`${styles.gauge} ${isActive ? styles.isActive : ""}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        value={value}
        disabled={disabled}
      />
      <output
        style={{ left: `calc(${thumbPos}% + (${8 - thumbPos * 0.15}px))` }}
      >
        {value}
      </output>
    </div>
  );
}
