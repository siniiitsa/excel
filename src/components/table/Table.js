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
    const sideToElongate = {
      col: 'bottom',
      row: 'right',
    }[type];
    let newValue;

    $resizer.css({
      opacity: 1,
      [sideToElongate]: '-5000px',
    });

    document.onmousemove = (e) => {
      switch (type) {
        case 'col': {
          const delta = e.pageX - coords.right;
          newValue = `${coords.width + delta}px`;
          $resizer.css({ right: `${-delta}px` });
          break;
        }
        case 'row': {
          const delta = e.pageY - coords.bottom;
          newValue = coords.height + delta;
          $resizer.css({ bottom: `${-delta}px` });
          break;
        }
        default:
          throw new Error(`Unknow resize type: ${type}`);
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      if (type === 'col') {
        $resizer.css({ right: 0 });
        this.$root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(($cell) => ($cell.style.width = newValue));
      } else if (type === 'row') {
        $parent.css({ height: `${newValue}px` });
        $resizer.css({ bottom: 0 });
      }
      $resizer.css({ opacity: 0 });
    };
  }

  toHTML() {
    return createTable(99);
  }
}
