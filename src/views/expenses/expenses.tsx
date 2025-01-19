import { useMemo } from "react";
import { MRT_ColumnDef, MRT_Row } from "material-react-table";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import ViewWrapper from "../../components/page/view-wrapper";
import AppDataTable from "../../components/datatable/app-datatable";
import { ExpenseGridItem } from "../../types/models";
import { useExpensesGridData } from "../../hooks/use-expenses";
import { ExpenseTypes } from "../../constants/modules";
import {
  formatAmountWithSymbol,
  formatQuantity,
} from "../view-utils/view-utils";
import expenseExport from "./expense-export";

type Props = {};

function Expenses({}: Props) {
  const { data, isFetching } = useExpensesGridData();
  const navigate = useNavigate();

  const gridData = useMemo(() => {
    if (isFetching) return [];
    if (data) return data.filter((e: any) => !e.fromInventoryAssignment);
  }, [data]);

  const rowAction = ({ row }: { row: MRT_Row<ExpenseGridItem> }) => (
    <Box className="center-width">
      <IconButton
        size="small"
        onClick={() => navigate(`/app/expenses/edit/${row.original.id}`)}
      >
        <DescriptionOutlinedIcon />
      </IconButton>
    </Box>
  );

  const columns = useMemo<MRT_ColumnDef<ExpenseGridItem>[]>(
    () => [
      {
        accessorKey: "transactionDate",
        header: "Date",
        size: 150,
        filterVariant: "date",
        muiFilterDatePickerProps: {
          format: "DD/MM/YYYY",
        },
        filterFn: (row, _columnIds, filterValue) => {
          const tmp = row.getValue<string>("transactionDate");
          if (!filterValue) {
            return false;
          }

          return (
            dayjs(tmp).format("YYYY-MM-DD") == filterValue.format("YYYY-MM-DD")
          );
        },
        Cell: ({ cell }) => {
          const v = cell.getValue<string>();
          return <span>{dayjs(v).format("MMM DD, YYYY")}</span>;
        },
      },
      {
        accessorFn: (row) =>
          `${row.expenseName.expenseName} - ${formatQuantity(
            row.quantity,
            row.expenseName.unit
          )}`,
        id: "expense",
        header: "Expense",
        size: 200,
      },
      {
        accessorKey: "expenseName.expenseClass.className",
        header: "Expense Class",
        size: 125,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 200,
      },
      {
        accessorKey: "totalAmount",
        header: "Amount",
        size: 100,
        Cell: ({ cell }) => (
          <>{formatAmountWithSymbol(cell.getValue<string>())}</>
        ),
      },
      {
        accessorFn: (row) => {
          let account = "";
          const boarder = row.boarder;
          const employee = row.employee;
          if (boarder) {
            account = boarder.firstName + " " + boarder.lastName;
          } else if (employee) {
            account = employee.firstName + " " + employee.lastName;
          } else if (row.isAssignLater) {
            account = `Inventory - ${row.transactionType.split("_")[0]}`;
          } else if (row.transactionType === ExpenseTypes.internal) {
            account = "Internal";
          }
          return account;
        },
        id: "account",
        header: "Account",
        size: 150,
      },
    ],
    []
  );

  const topToolBar = () => (
    <Box p={1}>
      {/* <Tooltip title="New Boarder"> */}
      <Button
        variant="outlined"
        size="small"
        onClick={() => {
          // const el = document.getElementById("add-expense");
          // el?.click();
          navigate("/app/expenses/new");
        }}
      >
        New
      </Button>

      <Button
        variant="outlined"
        size="small"
        sx={{ ml: 2 }}
        onClick={() => {
          expenseExport(data);
        }}
      >
        Export
      </Button>
      {/* </Tooltip> */}
    </Box>
  );

  return (
    <Box bgcolor="wheat">
      <AppDataTable
        data={gridData ?? []}
        isLoading={isFetching}
        columns={columns}
        topToolBar={topToolBar}
        rowAction={rowAction}
      />
    </Box>
  );
}
export default ViewWrapper(Expenses, "Expenses");
