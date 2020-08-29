export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }
  return string[0].toUpperCase() + string.slice(1);
}


function range(start, end) {
  if (start > end) {
    [start, end] = [end, start];
  }
  return new Array(end - start + 1)
    .fill()
    .reduce((acc, _, index) => [...acc, start + index], []);
}

export function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return cols.reduce(
    (acc, col) => [...acc, ...rows.map((row) => `${row}:${col}`)],
    []
  );
}
