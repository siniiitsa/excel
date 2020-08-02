const CODES = {
  A: 65,
  Z: 90,
};

const toCell = () => /* html */ `<div class="cell" contenteditable></div>`;

const createCol = (content) => /* html */ `
  <div class="column" data-type="resizable">
    ${content}
    <div class="col-resize" data-resize="col"></div>
  </div>`;

const createRow = (cells = '', rowIndex = 0) => {
  const resizer = /* html */ `<div class="row-resize" data-resize="row"></div>`;
  return /* html */ `
    <div class="row">
      <div class="row-info">
        ${rowIndex}
        ${rowIndex === 0 ? '' : resizer}
      </div>
      <div class="row-data">${cells}</div>
    </div>
  `;
};

const toCol = (_, i) => createCol(String.fromCharCode(CODES.A + i));

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


