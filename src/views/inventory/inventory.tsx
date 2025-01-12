import React from "react";
import ViewWrapper from "../../components/page/view-wrapper";
import ComingSoon from "../coming-soon";
import { useInventoryGridData } from "../../hooks/use-inventory";
import { Box, Title, Text } from "@mantine/core";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import InventoryItem from "../../components/inventroy/inventory-item";

type Props = {};

const testData = [
  {
    id: "1",
    expenseId: "2",
    itemName: "Diaper",
    description: "Monthly boarding fee edited",
    quantity: 97,
    costPerUnit: 5.5,
    inUse: true,
    stockingDate: null,
  },
  {
    id: "2",
    expenseId: "7",
    itemName: "Diaper 1",
    description: "test details",
    quantity: 106,
    costPerUnit: 5.5,
    inUse: null,
    stockingDate: "2025-01-12",
  },
];

function Inventory({}: Props) {
  const { data, isFetching } = useInventoryGridData();
  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "1rem",
        border: "1px solid #eaeaea",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        minHeight: 400,
        display:'flex',
        flexWrap:"wrap",
        gap:8
      }}
    >
      {data
        ? data.map((e: any) => (
            <InventoryItem
              key={e.id}
              item={e.itemName}
              quantity={e.quantity}
              stockingDate={e.stockingDate}
              unit={e.unit}
              inUse={e.inUse}
              onClick={() => {}}
            />
          ))
        : null}
    </Box>
  );
}

export default ViewWrapper(Inventory, "Inventory");
