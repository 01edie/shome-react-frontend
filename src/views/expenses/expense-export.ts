import dayjs from "dayjs";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const expenseExport = (data: any) => {
  const workbook = new ExcelJS.Workbook();

  // Function to apply shared styles and column definitions
  const createSheet = (
    sheetName: string,
    columns: any[],
    data: any[],
    isMainSheet = false
  ) => {
    const sheet = workbook.addWorksheet(sheetName);
    sheet.columns = columns;

    // Add rows to the sheet
    sheet.addRows(data);

    // Add sum of "Total Amount" at the bottom (directly below data with spacing)
    const totalAmount = data.reduce(
      (sum, item) => sum + parseFloat(item.totalAmount || "0"),
      0
    );

    const lastRow = sheet.rowCount + 1;
    const totalCellKey = isMainSheet ? "G" : "F";
    sheet.getCell(`${totalCellKey}${lastRow}`).value = totalAmount.toFixed(2);
    sheet.getCell(`${totalCellKey}${lastRow}`).font = { bold: true };

    const labelCellKey = isMainSheet ? "F" : "E";
    sheet.getCell(`${labelCellKey}${lastRow}`).value = "Total";
    sheet.getCell(`${labelCellKey}${lastRow}`).font = { bold: true };

    // Apply global row height and alignment
    sheet.eachRow((row) => {
      row.height = 25;
      row.eachCell((cell) => {
        cell.style = {
          ...cell.style,
          alignment: {
            horizontal: "center",
            vertical: "middle",
            wrapText: true,
          },
        };
      });
    });

    // Apply header style
    const headerRow = sheet.getRow(1);
    headerRow.height = 32;
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "133AD1" },
      };
      cell.border = {
        top: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true,
      };
    });
  };

  // Define columns for the sheet
  const columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Transaction Date", key: "transactionDate", width: 20 },
    { header: "Account", key: "account", width: 30 },
    { header: "Expense Name", key: "expenseName", width: 30 },
    { header: "Quantity", key: "quantity", width: 10 },
    { header: "Unit", key: "unit", width: 10 },
    { header: "Total Amount", key: "totalAmount", width: 15 },
    { header: "Description", key: "description", width: 30 },
    { header: "Notes", key: "notes", width: 30 },
  ];

  // Define columns for other sheets without "Account"
  const columnsWithoutAccount = [
    { header: "ID", key: "id", width: 10 },
    { header: "Transaction Date", key: "transactionDate", width: 20 },
    { header: "Expense Name", key: "expenseName", width: 30 },
    { header: "Quantity", key: "quantity", width: 10 },
    { header: "Unit", key: "unit", width: 10 },
    { header: "Total Amount", key: "totalAmount", width: 15 },
    { header: "Description", key: "description", width: 30 },
    { header: "Notes", key: "notes", width: 30 },
  ];

  // Format data with conditional logic
  const formatData = (items: any[], isMainSheet = true) =>
    items.map((item: any) => ({
      id: item.transactionId || item.id, 
      transactionDate: dayjs(item.transactionDate).format("DD-MM-YYYY_HH:mm"),
      account:
        `${item.boarder?.firstName || ""} ${
          item.boarder?.lastName || ""
        }`.trim() ||
        `${item.employee?.firstName || ""} ${
          item.employee?.lastName || ""
        }`.trim() ||
        (item.isAssignLater
          ? `Inventory - ${item.transactionType.split("_")[0]}`
          : "Internal"),
      expenseName: item.expenseName.expenseName,
      unit: item.expenseName.unit,
      quantity: item.quantity,
      totalAmount: isMainSheet
        ? parseFloat(item.totalAmount || "0").toFixed(2)
        : (parseFloat(item.userUnitAmount || "0") * item.quantity).toFixed(2),
      description: item.description,
      notes: item.notes,
    }));

  // Main Sheet: All non-inventory assignments
  const mainData = formatData(
    data.filter((item: any) => !item.fromInventoryAssignment)
  );
  createSheet("Main", columns, mainData, true);

  // Process boarder/employee grouped data
  const groupedData: Record<string, any[]> = {};
  data.forEach((item: any) => {
    const boarderEmployeeKey =
      item.boarder?.firstName + item.boarder?.lastName ||
      item.employee?.firstName + item.employee?.lastName;

    if (boarderEmployeeKey) {
      if (!groupedData[boarderEmployeeKey]) {
        groupedData[boarderEmployeeKey] = [];
      }
      groupedData[boarderEmployeeKey].push(item);
    }
  });

  // Create sheets for boarders/employees
  Object.entries(groupedData).forEach(([sheetName, items]) => {
    const sheetData = formatData(items, false);
    createSheet(sheetName, columnsWithoutAccount, sheetData);
  });

  // Save workbook
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(
      new Blob([buffer]),
      `shome_expense_${dayjs().format("DD-MM-YYYY_HH:mm")}.xlsx`
    );
  });
};

export default expenseExport;
