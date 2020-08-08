export class TableSelection {
  constructor() {
    this.group = [];
  }

  select($el) {
    this.clear();
    this.group.push($el);
    $el.addClass('selected');
  }

  clear() {
    this.group.forEach(($cell) => $cell.removeClass('selected'));
    this.group = [];
  }

  selectGroup() {

  }
}
