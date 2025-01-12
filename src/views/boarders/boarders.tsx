import React, { useMemo } from "react";
import { MRT_ColumnDef, MRT_Row } from "material-react-table";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";

import ViewWrapper from "../../components/page/view-wrapper";
import { useBoardersGridData } from "../../hooks/use-boarders";
import AppDataTable from "../../components/datatable/app-datatable";
import { Boarder } from "../../types/models";
import { useNavigate } from "react-router-dom";

type Props = {};

function Boarders({}: Props) {
  const { data, isFetching } = useBoardersGridData();
  const navigate = useNavigate();
  console.log(data);

  const rowAction = ({ row }: { row: MRT_Row<Boarder> }) => (
    <Box className="center-width">
      <IconButton
        size="small"
        onClick={() => navigate(`/app/boarders/edit/${row.original.id}`)}
      >
        <EditIcon />
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
        Cell: ({ cell }) => {
          const v = cell.getValue<string>();
          return <span>{dayjs(v).format("DD MMM, YYYY")}</span>;
        },
      },
    ],
    []
  );

  const topToolBar = () => (
    <Box p={1}>
      {/* <Tooltip title="New Boarder"> */}
      <Button variant="outlined" size="small">
        New
      </Button>
      {/* </Tooltip> */}
    </Box>
  );

  return (
    <Box bgcolor='wheat'>
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
