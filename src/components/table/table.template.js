const CODES = {
  A: 65,
  Z: 90,
};

const toCell = (_, index) =>
  /* html */ `<div class="cell" data-col="${index}" contenteditable></div>`;

const createCol = (content, index) => /* html */ `
  <div class="column" data-type="resizable" data-col="${index}">
    ${content}
    <div class="col-resize" data-resize="col"></div>
  </div>`;

const createRow = (cells = '', rowIndex = 0) => {
  const rowResizeData = rowIndex > 0 ? ' data-type="resizable"' : '';
  const resizerData = rowIndex > 0 ? ' data-resize="row"' : '';

  const resizer = /* html */ `<div class="row-resize"${resizerData}></div>`;
  return /* html */ `
    <div class="row"${rowResizeData}>
      <div class="row-info">
        ${rowIndex}
        ${rowIndex === 0 ? '' : resizer}
      </div>
      <div class="row-data">${cells}</div>
    </div>
  `;
};

const toCol = (_, i) => createCol(String.fromCharCode(CODES.A + i), i);

export const createTable = (rowsCount = 15) => {
  const colsCount = CODES.Z - CODES.A + 1;

  const cols = new Array(colsCount).fill().map(toCol).join('');

  const rows = [createRow(cols, 0)];
  for (let i = 1; i <= rowsCount; i++) {
    const cells = new Array(colsCount).fill().map(toCell).join('');
    rows.push(createRow(cells, i));
  }

  return rows.join('');
};
