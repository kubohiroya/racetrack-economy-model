import { Model } from "@/model/model";
import { SelectType } from "@/model/selectType";

export class DiagonalMatrixView {
  private id: string;
  private tableElement: HTMLTableElement;
  private model: Model | undefined;

  constructor(id: string) {
    this.id = id;
    this.tableElement = document.getElementById(this.id) as HTMLTableElement;
  }

  setModel(model: Model) {
    this.model = model;
  }

  decorateTable(
    type: string,
    rowIndex: number,
    columnIndex: number,
    set: boolean,
  ) {
    if (set) {
      this.tableElement.classList.add(type);
    } else {
      this.tableElement.classList.remove(type);
    }

    const row = this.tableElement.rows[rowIndex];
    if (row && row.cells) {
      for (let i = 0; i < row.cells.length; i++) {
        if (set) {
          row.cells[i].classList.add(type);
        } else {
          row.cells[i].classList.remove(type);
        }
      }
    }

    for (let i = 0; i < this.tableElement.rows.length; i++) {
      const row = this.tableElement.rows[i];
      if (row.cells[columnIndex]) {
        if (set) {
          row.cells[columnIndex].classList.add(type);
        } else {
          row.cells[columnIndex].classList.remove(type);
        }
      }
    }
  }

  adjustTableSize(
    rows: number,
    columns: number,
    rowsMax: number,
    columnsMax: number,
  ): void {
    if (!this.model) return;
    const actualRows = Math.min(rows, rowsMax);
    const actualColumns = Math.min(columns, columnsMax);

    //行の削除
    while (actualRows < this.tableElement.rows.length - 1) {
      this.tableElement.deleteRow(-1);
    }

    //列の削除
    if (
      0 < this.tableElement.rows.length &&
      actualColumns + 1 < this.tableElement.rows[0].cells.length
    ) {
      for (
        let rowIndex = 0;
        (0 < this.tableElement.rows.length &&
          this.tableElement.rows[rowIndex] &&
          rowIndex < this.tableElement.rows[rowIndex].cells.length - 1) ||
        rowIndex < actualRows;
        rowIndex++
      ) {
        for (
          let columnIndex = actualColumns;
          this.tableElement.rows[rowIndex] &&
          columnIndex < this.tableElement.rows[rowIndex].cells.length;
          columnIndex++
        ) {
          this.tableElement.rows[rowIndex].deleteCell(-1);
        }
      }
    }

    // 行の追加
    for (
      let rowIndex = this.tableElement.rows.length;
      rowIndex < actualRows + 1;
      rowIndex++
    ) {
      const newRow = document.createElement("tr");
      this.tableElement.appendChild(newRow);
    }

    function debounceMouseEventHandler(
      func: (event: MouseEvent) => void,
      timeout = 100,
    ) {
      // A slot to save timer id for current debounced function
      let timer: NodeJS.Timeout | null = null;
      // Return a function that conditionally calls the original function
      return (event: MouseEvent) => {
        // Immediately cancel the timer when called
        if (timer) {
          clearTimeout(timer);
        }
        // Start another timer that will call the original function
        timer = setTimeout(() => {
          func(event);
        }, timeout);
      };
    }

    for (let rowIndex = 0; rowIndex < actualRows + 1; rowIndex++) {
      for (
        let columnIndex = this.tableElement.rows[rowIndex].cells.length;
        columnIndex < actualColumns + 1;
        columnIndex++
      ) {
        const newCell = document.createElement(
          rowIndex == 0 || columnIndex == 0 ? "th" : "td",
        );
        newCell.textContent =
          rowIndex == 0
            ? columnIndex == 0
              ? ""
              : `${columnIndex - 1}`
            : columnIndex == 0
            ? `${rowIndex - 1}`
            : "";
        this.tableElement.rows[rowIndex].appendChild(newCell);
        if (rowIndex == 0) {
          newCell.addEventListener("mousedown", () => {
            this.model?.notifyRegionSelect(
              this.id,
              this.model?.selectedRegionIds,
              SelectType.SELECTED,
              false,
            );
            this.model?.notifyRegionSelect(
              this.id,
              [columnIndex - 1],
              SelectType.SELECTED,
              true,
            );
          });
          newCell.addEventListener("mouseover", () => {
            this.model?.notifyRegionSelect(
              this.id,
              [columnIndex - 1],
              SelectType.FOCUSED,
              true,
            );
          });
          newCell.addEventListener("mouseout", () => {
            this.model?.notifyRegionSelect(
              this.id,
              [columnIndex - 1],
              SelectType.FOCUSED,
              false,
            );
          });
        } else if (columnIndex == 0) {
          newCell.addEventListener("mousedown", () => {
            this.model?.notifyRegionSelect(
              this.id,
              this.model?.selectedRegionIds,
              SelectType.SELECTED,
              false,
            );
            this.model?.notifyRegionSelect(
              this.id,
              [rowIndex - 1],
              SelectType.SELECTED,
              true,
            );
          });
          newCell.addEventListener("mouseover", () => {
            this.model?.notifyRegionSelect(
              this.id,
              [rowIndex - 1],
              SelectType.FOCUSED,
              true,
            );
          });

          newCell.addEventListener("mouseout", () => {
            this.model?.notifyRegionSelect(
              this.id,
              [rowIndex - 1],
              SelectType.FOCUSED,
              false,
            );
          });
        } else {
          newCell.addEventListener("mousedown", () => {
            this.model?.notifyRegionSelect(
              this.id,
              this.model?.selectedRegionIds,
              SelectType.SELECTED,
              false,
            );
            this.model?.notifyRegionSelect(
              this.id,
              [rowIndex - 1, columnIndex - 1],
              SelectType.SELECTED,
              true,
            );
          });
          newCell.addEventListener("mouseover", () => {
            this.model?.notifyRegionSelect(
              this.id,
              [rowIndex - 1, columnIndex - 1],
              SelectType.FOCUSED,
              true,
            );
          });
          newCell.addEventListener("mouseout", () => {
            this.model?.notifyRegionSelect(
              this.id,
              [rowIndex - 1, columnIndex - 1],
              SelectType.FOCUSED,
              false,
            );
          });
        }
      }
    }

    if (columns >= columnsMax) {
      for (let i = 1; i < this.tableElement.rows.length; i++) {
        const cells = this.tableElement.rows[i].cells;
        const n = cells.length;
        cells[n - 1].textContent = "...";
      }
    }
    if (rows >= rowsMax) {
      const n = this.tableElement.rows.length;
      for (let j = 0; j < this.tableElement.rows[n - 1].cells.length; j++) {
        this.tableElement.rows[n - 1].cells[j].textContent = "...";
      }
    }
  }

  setTableContent(
    data: number[][],
    rowsMax: number,
    columnsMax: number,
    toCellString: (value: number) => string,
  ): void {
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
        const cellString = toCellString(data[i][j]);
        cell.textContent = cellString;
        cell.setAttribute("title", cellString);
        cell.style.backgroundColor = `rgba(255, 0, 0, ${alphaValue})`;
      }
    }
  }
}
