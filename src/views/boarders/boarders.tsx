import React, { useMemo } from "react";
import { MRT_ColumnDef, MRT_Row } from "material-react-table";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import dayjs from "dayjs";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import ViewWrapper from "../../components/page/view-wrapper";
import { useBoardersGridData } from "../../hooks/use-boarders";
import AppDataTable from "../../components/datatable/app-datatable";
import { Boarder } from "../../types/models";
import { useNavigate } from "react-router-dom";

type Props = {};

function Boarders({}: Props) {
  const { data, isFetching } = useBoardersGridData();
  const navigate = useNavigate();

  const rowAction = ({ row }: { row: MRT_Row<Boarder> }) => (
    <Box className="center-width">
      <IconButton
        size="small"
        onClick={() => navigate(`/app/boarders/edit/${row.original.id}`)}
      >
        <PersonOutlineOutlinedIcon />
      </IconButton>
    </Box>
  );

  const columns = useMemo<MRT_ColumnDef<Boarder>[]>(
    () => [
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "bloodGroup",
        header: "Blood Group",
        size: 150,
      },
      // {
      //   accessorKey: "emergencyContact",
      //   header: "Emergency Contact",
      //   size: 150,
      // },
      {
        accessorKey: "medicalCondition",
        header: "Medical Condition",
        size: 150,
      },
      {
        accessorKey: "allergies",
        header: "Allergies",
        size: 150,
      },
      {
        accessorKey: "specialNeeds",
        header: "Special Needs",
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
        onClick={() => navigate("/app/boarders/new")}
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

export default ViewWrapper(Boarders, "Boarders");
