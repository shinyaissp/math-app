export function getButtonStyle(i, selected, revealed_1, revealed_2) {
  return {
    color:
      i === selected
        ? "rgba(206, 135, 135, 0.78)"
        : i === revealed_1
        ? "rgba(100, 100, 100, 0.9)"
        : i === revealed_2
        ? "rgba(100, 100, 100, 0.9)"
        : "rgba(184, 184, 184, 0.5)",
    border:
      i === selected
        ? "2px solid pink"
        : i === revealed_1
        ? "2px solid black"
        : i === revealed_2
        ? "2px solid black"
        : "none"
  };
}
