import { useMemo } from "react";
import { MRT_ColumnDef, MRT_Row } from "material-react-table";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import dayjs from "dayjs";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useNavigate } from "react-router-dom";

import ViewWrapper from "../../components/page/view-wrapper";
import AppDataTable from "../../components/datatable/app-datatable";
import { Employee } from "../../types/models";
import { useEmployeesGridData } from "../../hooks/use-employees";

type Props = {};

function Employees({}: Props) {
  const { data, isFetching } = useEmployeesGridData();
  const navigate = useNavigate();

  const rowAction = ({ row }: { row: MRT_Row<Employee> }) => (
    <Box className="center-width">
      <IconButton
        size="small"
        onClick={() => navigate(`/app/employees/edit/${row.original.id}`)}
      >
        <PersonOutlineOutlinedIcon />
      </IconButton>
    </Box>
  );

  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "contactNumber",
        header: "Contact Number",
        size: 150,
      },
      {
        accessorKey: "employeeRole",
        header: "Role",
        size: 150,
      },
      {
        accessorKey: "notes",
        header: "Notes",
        size: 150,
      },
      {
        accessorKey: "joiningDate",
        header: "Joining Date",
        size: 150,
        filterVariant: "date",
        muiFilterDatePickerProps: {
          format: "DD/MM/YYYY",
        },
        filterFn: (row, _columnIds, filterValue) => {
          const tmp = row.getValue<string>("joiningDate");
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
          navigate("/app/employees/new");
        }}
      >
        New
      </Button>
      {/* </Tooltip> */}
    </Box>
  );

  return (
    <Box bgcolor="wheat">
      <AppDataTable
        data={data ?? []}
        isLoading={isFetching}
        columns={columns}
        topToolBar={topToolBar}
        rowAction={rowAction}
      />
    </Box>
  );
}
export default ViewWrapper(Employees, "Employees");
