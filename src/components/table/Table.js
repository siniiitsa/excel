import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { shouldResize, isCell } from './table.functions';
import { resizeHandler } from './table.resize';
import { TableSelection } from './TableSelection';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="1:1"]');
    this.selection.select($cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }

    if (isCell(event)) {
      const $cell = $(event.target);
      this.selection.select($cell);
    }
  }

  toHTML() {
    return createTable(99);
  }
}
