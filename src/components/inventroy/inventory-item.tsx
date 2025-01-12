import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { formatQuantity } from "../../views/view-utils/view-utils";

type Props = {
  quantity: number;
  unit: string;
  item: string;
  inUse: boolean;
  stockingDate: string;
  onClick: () => void;
};

function InventoryItem({
  item,
  quantity,
  unit,
  stockingDate,
  inUse,
  onClick,
}: Props) {
  return (
    <Card variant="outlined" sx={{ minWidth: 200, height:100 }}>
      <CardActionArea onClick={onClick} sx={{height:'100%'}}>
        <CardHeader
          title={item}
          subheader={dayjs(stockingDate).format("DD MMM, YYYY")}
          sx={{ p: 1 }}
          titleTypographyProps={{
            sx: { fontSize: 16, fontWeight: 500 },
          }}
          subheaderTypographyProps={{
            sx: { fontSize: 14 },
          }}
        />
        <CardContent sx={{ p: 1, pt: 0, pb: "8px !important" }}>
          <Box display="flex" sx={{ justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 14 }}>
              {inUse ? "In Use" : "Not Used Yet"}
            </Typography>
            <Typography sx={{ fontSize: 14 }}>
              {formatQuantity(quantity, unit)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default InventoryItem;
