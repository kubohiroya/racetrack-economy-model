import { Model } from "@/model/model";

export class DiagonalMatrixView {
  private tableElement: HTMLTableElement;
  private model: Model | undefined;

  constructor(private id: string) {
    this.tableElement = document.getElementById(this.id) as HTMLTableElement;
  }

  setModel(model: Model) {
    this.model = model;
  }

  adjustTableSize(
    rows: number,
    columns: number,
    rowsMax: number,
    columnsMax: number,
  ): void {
    if (!this.model) return;
    const actualRows = Math.min(rows + 1, rowsMax + 1); // +1 はヘッダのため
    const actualColumns = Math.min(columns + 1, columnsMax + 1); // +1 はヘッダのため
    // 行の調整
    for (
      let rowIndex = this.tableElement.rows.length - 1;
      this.tableElement.rows.length < actualRows;
      rowIndex++
    ) {
      const newRow = this.tableElement.insertRow();
      const newCell = newRow.insertCell();
      newCell.tagName === "td"
        ? newRow.cells[0].replaceWith(newRow.insertCell(0))
        : null;

      newCell.addEventListener("mouseover", () => {
        this.model?.setFocusedRegionIndex(rowIndex);
        this.model?.notifyFocusRegion();
      });
      newCell.addEventListener("mouseout", () => {
        this.model?.setFocusedRegionIndex(-1);
        this.model?.notifyFocusRegion();
      });
    }
    while (this.tableElement.rows.length > actualRows) {
      this.tableElement.deleteRow(this.tableElement.rows.length - 1);
    }

    // 列の調整
    for (let i = 0; i < this.tableElement.rows.length; i++) {
      for (
        let columnIndex = this.tableElement.rows[i].cells.length - 1;
        this.tableElement.rows[i].cells.length < actualColumns;
        columnIndex++
      ) {
        const newCell = this.tableElement.rows[i].insertCell();
        if (
          i === 0 ||
          this.tableElement.rows[i].cells.length === columnsMax + 1
        ) {
          const cell = this.tableElement.rows[i].insertCell(-1);
          newCell.replaceWith(cell);
          cell.addEventListener("mouseover", () => {
            this.model?.setFocusedRegionIndex(columnIndex);
            this.model?.notifyFocusRegion();
          });
          cell.addEventListener("mouseout", () => {
            this.model?.setFocusedRegionIndex(-1);
            this.model?.notifyFocusRegion();
          });
        } else {
          newCell.addEventListener("mouseover", () => {
            this.model?.setFocusedRouteIndex([columnIndex, i - 1], this.id);
            this.model?.notifyFocusRegion();
          });
          newCell.addEventListener("mouseout", () => {
            this.model?.setFocusedRouteIndex(null, null);
            this.model?.notifyFocusRegion();
          });
        }
      }
      while (this.tableElement.rows[i].cells.length > actualColumns) {
        this.tableElement.rows[i].deleteCell(
          this.tableElement.rows[i].cells.length - 1,
        );
      }
    }

    // 先頭列と先頭行に番号を追加
    for (let i = 1; i < this.tableElement.rows.length; i++) {
      const cell = this.tableElement.rows[i].cells[0];
      cell.textContent = (i - 1).toString();
    }
    for (let j = 1; j < this.tableElement.rows[0].cells.length; j++) {
      const cell = this.tableElement.rows[0].cells[j];
      cell.textContent = (j - 1).toString();
    }

    // "..." を追加
    if (rows > rowsMax - 1) {
      for (let j = 0; j < this.tableElement.rows[rowsMax].cells.length; j++) {
        this.tableElement.rows[rowsMax].cells[j].textContent = "...";
      }
    }
    if (columns > columnsMax - 1) {
      for (let i = 0; i < this.tableElement.rows.length; i++) {
        this.tableElement.rows[i].cells[columnsMax].textContent = "...";
      }
    }
  }

  setTableContent(
    data: number[][],
    rowsMax: number,
    columnsMax: number,
    toCellString: (value: number) => string,
  ): void {
    // 最大値を見つける
    let maxVal = 0;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] != Number.POSITIVE_INFINITY) {
          maxVal = Math.max(maxVal, data[i][j]);
        }
      }
    }

    for (
      let i = 0;
      i < rowsMax - 1 &&
      i < data.length &&
      i < this.tableElement.rows.length - 1;
      i++
    ) {
      for (
        let j = 0;
        j < columnsMax - 1 &&
        j < data[i].length &&
        j < this.tableElement.rows[i + 1].cells.length - 1;
        j++
      ) {
        const value = data[i][j];
        const alphaValue =
          value != Number.POSITIVE_INFINITY ? value / maxVal : "0";
        const cell = this.tableElement.rows[i + 1].cells[j + 1];
        cell.textContent = toCellString(data[i][j]); // +1 はヘッダのため
        cell.style.backgroundColor = `rgba(255, 0, 0, ${alphaValue})`;
      }
    }
  }
}
