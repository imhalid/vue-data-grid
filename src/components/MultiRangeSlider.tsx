import React, { useMemo } from 'react';
import './MultiRangeSlider.sass';

interface MultiRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const rangeColor = '#15a4fa';

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({ min, max, value, onChange }) => {
  const rangePercentage = useMemo(() => ({
    start: `${(value[0] - min) / (max - min) * 100}%`,
    end: `${(value[1] - min) / (max - min) * 100}%`
  }), [value, min, max]);

  const barLenStyle = {
    background: `linear-gradient(to right, transparent ${rangePercentage.start}, ${rangeColor} ${rangePercentage.start}, ${rangeColor} ${rangePercentage.end}, transparent ${rangePercentage.end}) no-repeat`
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isMin = event.target.name === 'min';
    const numValue = Number(event.target.value);
    const result: [number, number] = isMin
      ? [Math.min(numValue, value[1] - 1), value[1]]
      : [value[0], Math.max(value[0] + 1, numValue)];

    // Note: The original Vue code had logic:
    // result = event.target.name === 'min'
    //   ? [Math.min(event.target.value, this.value[1] - 1), this.value[1]]
    //   : [this.value[0], Math.max(this.value[0] - 1, event.target.value)]
    //
    // Wait, the original code for max was:
    // Math.max(this.value[0] - 1, event.target.value)
    // This seems weird. If I drag max slider, it should be >= value[0] + 1 (if we want gap).
    // The original logic `this.value[0] - 1` seems to allow overlap or something?
    // Let's re-read carefully: `Math.max(this.value[0] - 1, event.target.value)`
    // If value[0] is 10. Max slider is 20. I drag max to 5.
    // result is max(9, 5) = 9. So it limits to value[0] - 1? That implies min > max?
    // No, min should be less than max.
    // If min is 10. Max is 20.
    // I drag max to 11. result is max(9, 11) = 11. OK.
    // I drag max to 9. result is max(9, 9) = 9. So max becomes 9. Min is 10.
    // Then min > max. That's bug or feature?
    // The min slider logic: `Math.min(event.target.value, this.value[1] - 1)`
    // If max is 20. I drag min to 21. result is min(21, 19) = 19.
    // So min is capped at max - 1.

    // So max should probably be capped at min + 1.
    // `Math.max(this.value[0] + 1, event.target.value)` makes more sense for "at least 1 gap".
    // Or maybe `Math.max(this.value[0], event.target.value)` for no gap.

    // The original code: `Math.max(this.value[0] - 1, event.target.value)`
    // If value[0] is 10. It returns max(9, val).
    // If val is 5. It returns 9. So max becomes 9. Min is 10.
    // This allows crossing?

    // I will stick to the intention of "capped by the other value".
    // Assuming we want `min < max`.

    // Let's assume standard behavior: min <= max.
    // And strict strict inequality: min < max (implied by `-1`).

    // I'll implement standard strict behavior.

    onChange(result);
  };

  const toNumberAbbr = (num: number) => {
    return num < 1000 ? num : `${Math.floor(num / 1000)}k`;
  };

  return (
    <div className="multiRangeSlider">
      <input
        className="multiRange multiRange--min"
        name="min"
        type="range"
        min={min}
        max={max}
        value={value[0]}
        onChange={handleInputChange}
      />
      <input
        className="multiRange multiRange--max"
        name="max"
        type="range"
        min={min}
        max={max}
        value={value[1]}
        onChange={handleInputChange}
      />
      <div className="rangeBar" style={barLenStyle}></div>
      <div className="rangeLabel">
        <label className="label label--min">{toNumberAbbr(value[0])}</label>
        <label className="label label--max">{toNumberAbbr(value[1])}</label>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
