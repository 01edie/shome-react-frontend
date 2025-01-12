import React from "react";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

type Props = {
  heading?: string;
  title?: string;
  children: React.ReactNode;
  additionalDetails?: React.ReactNode;
  lastItem?: boolean;
  chartHeight?: number;
  id: number;
};

function ChartContainer({
  heading,
  title,
  children,
  additionalDetails,
  lastItem,
  chartHeight,
  id,
}: Props) {
  const saveChart = (chartTitle: string | undefined) => {
    const chartEl = document.getElementById(`chart-content${id}`)!;
    // const chartEl= chartElO.cloneNode(true)
    const downloadButtonEl = document.getElementById(`download-button${id}`)!;
    downloadButtonEl.style.visibility = "hidden";
    chartEl.style.paddingRight = "8px";
    htmlToImage.toPng(chartEl).then((dataUrl) => {
      download(dataUrl, `${chartTitle ?? "chart"}.png`);
    });
    setTimeout(() => {
      downloadButtonEl.style.visibility = "visible";
      chartEl.style.paddingRight = "0px";
    }, 1500);
  };

  return (
    <Grid item xs={12} id={`chart-content${id}`} bgcolor="white">
      {heading ? (
        <Typography variant="h6" mb={2}>
          {heading}
        </Typography>
      ) : null}
      <Paper variant="outlined" sx={{ p: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Box />
          <Typography textAlign="center" variant="h6">
            {title ?? ""}
          </Typography>
          <IconButton
            id={`download-button${id}`}
            onClick={() => {
              saveChart(title);
            }}
          >
            <SaveAltIcon />
          </IconButton>
        </Box>
        <Box height={chartHeight ?? 375}>{children}</Box>
      </Paper>
      {additionalDetails ? <Box my={2}>{additionalDetails}</Box> : null}
      {!lastItem ? (
        <Box display="flex" justifyContent="center">
          <Divider sx={{ width: 35, mt: 3 }} />
        </Box>
      ) : null}
    </Grid>
  );
}

export default ChartContainer;
