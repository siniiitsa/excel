import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  onMousedown(event) {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    const cells =
      type === 'col' && this.$root.findAll(`[data-col="${$parent.data.col}"]`);

    document.onmousemove = (e) => {
      switch (type) {
        case 'col': {
          const delta = e.pageX - coords.right;
          const newWidth = `${coords.width + delta}px`;
          $parent.css({ width: newWidth });
          cells.forEach(($cell) => ($cell.style.width = newWidth));
          break;
        }
        case 'row': {
          const delta = e.pageY - coords.bottom;
          $parent.css({ height: `${coords.height + delta}px` });
          break;
        }
        default:
          throw new Error(`Unknow resize type: ${type}`);
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
    };
  }

  toHTML() {
    return createTable(99);
  }
}
