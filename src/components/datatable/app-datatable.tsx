import { ReactNode, useMemo } from "react";
import {
  MaterialReactTable,
  MRT_Cell,
  MRT_Row,
  MRT_TableInstance,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

type Props = {
  columns: MRT_ColumnDef<any, unknown>[];
  data: any[];
  isLoading?: boolean;
  topToolBar?: () => ReactNode;
  rowAction?:
    | ((props: {
        cell: MRT_Cell<any>;
        row: MRT_Row<any>;
        staticRowIndex?: number | undefined;
        table: MRT_TableInstance<any>;
      }) => ReactNode)
    | undefined;
};

const AppDataTable = ({
  data,
  columns,
  isLoading,
  topToolBar,
  rowAction,
}: Props) => {
  const table = useMaterialReactTable({
    columns,
    data,
    enableDensityToggle: false,
    state: {
      isLoading,
    },
    enableStickyHeader: true,
    columnFilterDisplayMode: "popover",
    enableColumnActions: false,
    muiTableContainerProps: ({ table }) => {
      return {
        style: {
          height: table.getState().isFullScreen ? "unset" : "350px",
          backgroundColor: "whitesmoke",
        },
      };
    },
    muiTableHeadCellProps: {
      sx: (theme) => ({
        background: "#f9f9f9",
        borderTop: "1px solid rgba(224,224,224,1)",
        borderRight: "1px solid rgba(224,224,224,1)",
        color: theme.palette.text.primary,
      }),
    },
    muiTableBodyCellProps: {
      sx: {
        borderRight: "1px solid rgba(224,224,224,1)",
        padding: "8px",
      },
    },
    renderTopToolbarCustomActions: topToolBar,
    enableRowActions: Boolean(rowAction),
    renderRowActions: rowAction,
    muiBottomToolbarProps: {
      sx: {
        backgroundColor: "#ebebeb",
      },
    },
    muiTopToolbarProps: {
      sx: {
        backgroundColor: "whitesmoke",
      },
    },
    displayColumnDefOptions: {
      "mrt-row-actions": {
        size: 25,
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default AppDataTable;
