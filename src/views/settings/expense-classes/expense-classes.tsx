import { Box, Button, IconButton, Paper } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AppDataTable from "../../../components/datatable/app-datatable";
import { useNavigate } from "react-router-dom";
import { MRT_ColumnDef, MRT_Row } from "material-react-table";
import { ExpenseClass } from "../../../types/models";
import { useExpenseClassesListData } from "../../../hooks/use-list-data";
import AppDialog from "../../../components/dialog/app-dialog";
import ExpenseClassForm from "./expense-class-form";

type Props = {};

function ExpenseClasses({}: Props) {
  const { data, isFetching, refetch } = useExpenseClassesListData();
  const navigate = useNavigate();
  // console.log(data);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<ExpenseClass>();

  const handleOpen = () => {
    setFormOpen(true);
  };

  const handleClose = () => {
    setFormOpen(false);
    setEditData(undefined);
  };

  const rowAction = ({ row }: { row: MRT_Row<ExpenseClass> }) => (
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

  const columns = useMemo<MRT_ColumnDef<ExpenseClass>[]>(
    () => [
      {
        accessorKey: "className",
        header: "Class",
        size: 200,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 400,
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
        title={editData?.id ? "Edit Expense Class" : "Add New Expense Class"}
        open={formOpen}
        onClose={handleClose}
      >
        <ExpenseClassForm
          refetch={refetch}
          onClose={handleClose}
          editData={editData}
        />
      </AppDialog>
    </Paper>
  );
}

export default ExpenseClasses;
