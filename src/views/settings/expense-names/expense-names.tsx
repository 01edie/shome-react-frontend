import { Box, Button, IconButton, Paper } from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { MRT_ColumnDef, MRT_Row } from "material-react-table";
import { useNavigate } from "react-router-dom";

import AppDataTable from "../../../components/datatable/app-datatable";
import { useExpenseNamesListData } from "../../../hooks/use-list-data";
import type { ExpenseName, ExpenseNameGridItem } from "../../../types/models";
import AppDialog from "../../../components/dialog/app-dialog";
import ExpenseNameForm from "./expense-name-form";

type Props = {};

function ExpenseNames({}: Props) {
  const { data, isFetching, refetch } = useExpenseNamesListData();
  const navigate = useNavigate();

  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<ExpenseNameGridItem>();

  const handleOpen = () => {
    setFormOpen(true);
  };

  const handleClose = () => {
    setFormOpen(false);
    setEditData(undefined);
  };

  const rowAction = ({ row }: { row: MRT_Row<ExpenseNameGridItem> }) => (
    <Box className="center-width">
      <IconButton
        size="small"
        onClick={() => {
          setEditData(row.original);
          setTimeout(handleOpen, 50);
        }}
      >
        <EditIcon />
      </IconButton>
    </Box>
  );

  const columns = useMemo<MRT_ColumnDef<ExpenseNameGridItem>[]>(
    () => [
      {
        accessorKey: "expenseName",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "expenseClass.className",
        header: "Class",
        size: 150,
      },
      {
        accessorKey: "unit",
        header: "Unit",
        size: 150,
      },
      {
        accessorKey: "transactionType",
        header: "Type",
        Cell: ({ cell }) => <>{cell.getValue<string>().split("_")[0]}</>,
        size: 150,
      },
    ],
    []
  );

  const topToolBar = () => (
    <Box p={1}>
      {/* <Tooltip title="New Boarder"> */}
      <Button variant="outlined" size="small" onClick={handleOpen}>
        New
      </Button>
      {/* </Tooltip> */}
    </Box>
  );

  return (
    <Paper sx={{ p: 2, borderRadius: 2 }} elevation={2}>
      <AppDataTable
        data={data ?? []}
        isLoading={isFetching}
        columns={columns}
        topToolBar={topToolBar}
        rowAction={rowAction}
      />
      <AppDialog
        title={editData?.id ? "Edit Expense Name" : "Add New Expense Name"}
        open={formOpen}
        onClose={handleClose}
      >
        <ExpenseNameForm
          refetch={refetch}
          onClose={handleClose}
          editData={editData}
        />
      </AppDialog>
    </Paper>
  );
}

export default ExpenseNames;
