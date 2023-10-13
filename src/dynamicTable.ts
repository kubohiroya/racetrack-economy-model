export class DynamicTable {
  private tableElement: HTMLTableElement;

  constructor(private id: string) {
    this.tableElement = document.getElementById(this.id) as HTMLTableElement;
  }

  adjustTableSize(rows: number, columns: number, rowsMax: number, columnsMax: number): void {
    const actualRows = Math.min(rows + 1, rowsMax + 1);  // +1 はヘッダのため
    const actualColumns = Math.min(columns + 1, columnsMax + 1);  // +1 はヘッダのため
    // 行の調整
    while (this.tableElement.rows.length < actualRows) {
      const newRow = this.tableElement.insertRow();
      newRow.insertCell().tagName === 'td' ? newRow.cells[0].replaceWith(newRow.insertCell(0)) : null;
    }
    while (this.tableElement.rows.length > actualRows) {
      this.tableElement.deleteRow(this.tableElement.rows.length - 1);
    }

    // 列の調整
    for (let i = 0; i < this.tableElement.rows.length; i++) {
      while (this.tableElement.rows[i].cells.length < actualColumns) {
        const newCell = this.tableElement.rows[i].insertCell();
        if (i === 0 || this.tableElement.rows[i].cells.length === columnsMax + 1) {
          newCell.replaceWith(this.tableElement.rows[i].insertCell(-1));
        }
      }
      while (this.tableElement.rows[i].cells.length > actualColumns) {
        this.tableElement.rows[i].deleteCell(this.tableElement.rows[i].cells.length - 1);
      }
    }

    // 先頭列と先頭行に番号を追加
    for (let i = 1; i < this.tableElement.rows.length; i++) {
      this.tableElement.rows[i].cells[0].textContent = (i - 1).toString();
    }
    for (let j = 1; j < this.tableElement.rows[0].cells.length; j++) {
      this.tableElement.rows[0].cells[j].textContent = (j - 1).toString();
    }

    // "..." を追加
    if (rows > rowsMax) {
      for (let j = 0; j < this.tableElement.rows[rowsMax].cells.length; j++) {
        this.tableElement.rows[rowsMax].cells[j].textContent = '...';
      }
    }
    if (columns > columnsMax) {
      for (let i = 0; i < this.tableElement.rows.length; i++) {
        this.tableElement.rows[i].cells[columnsMax].textContent = '...';
      }
    }
  }

  setTableContent(data: number[][], toCellString:(value:number)=>string): void {
    // 最大値を見つける
    let maxVal = 0;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        maxVal = Math.max(maxVal, data[i][j]);
      }
    }

    for (let i = 0; i < data.length && i < this.tableElement.rows.length - 1; i++) {
      for (let j = 0; j < data[i].length && j < this.tableElement.rows[i + 1].cells.length - 1; j++) {
        const alphaValue = data[i][j] / maxVal;
        this.tableElement.rows[i + 1].cells[j + 1].textContent = toCellString(data[i][j]);  // +1 はヘッダのため
        this.tableElement.rows[i + 1].cells[j + 1].style.backgroundColor = `rgba(255, 0, 0, ${alphaValue})`;
      }
    }
  }

}