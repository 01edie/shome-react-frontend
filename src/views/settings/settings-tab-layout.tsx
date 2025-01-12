import {
  Box,
  SxProps,
  Tab,
  tabClasses,
  Tabs,
  tabsClasses,
  TabsProps,
  Theme,
} from "@mui/material";
import React, { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ExpenseClasses from "./expense-classes/expense-classes";
import ExpenseNames from "./expense-names/expense-names";
import { Outlet, useNavigate } from "react-router-dom";

type Props = {};

export const tabsStyles = () => ({
  root: {
    backgroundColor: "#dbdbdb",
    borderRadius: "10px",
    minHeight: 44,
  },
  flexContainer: {
    position: "relative",
    padding: "0 3px",
    zIndex: 1,
  },
  indicator: {
    top: 3,
    bottom: 3,
    right: 3,
    height: "auto",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px 0 rgba(0,0,0,0.16)",
  },
});

export const tabItemStyles = (theme: Theme) => ({
  root: {
    fontWeight: 500,
    minHeight: 44,
    minWidth: 96,
    opacity: 0.7,
    color: theme.palette.text.primary,
    textTransform: "initial",
    "&:hover": {
      opacity: 1,
    },
    [`&.${tabClasses.selected}`]: {
      color: theme.palette.text.primary,
      opacity: 1,
    },
    [theme.breakpoints.up("md")]: {
      minWidth: 120,
    },
  },
});

function toSx<ClassKey extends string>(
  styles: (theme: Theme) => Partial<Record<ClassKey, any>>,
  classes: Record<ClassKey, string>
) {
  return function sxCallback(theme: Theme) {
    let sx = {};
    Object.entries<any>(styles(theme)).forEach(([key, value]) => {
      if (key === "root") {
        sx = { ...sx, ...value };
      } else {
        // @ts-ignore
        sx[`& .${classes[key]}`] = value;
      }
    });
    return sx;
  } as SxProps<Theme>;
}

const tabRouteMapping = new Map([
  ["expense-classes", "/app/settings"],
  ["expense-names", "/app/settings/expense-names"],
]);

let sx: TabsProps = {};
function SettingsTabLayout({}: Props) {
  const initTab =
    location.pathname.split("/").at(-1) === "settings"
      ? "expense-classes"
      : "expense-names";

  const [value, setValue] = useState(initTab ?? "expense-classes");
  const tabItemSx = toSx(tabItemStyles, tabClasses);
  const navigate = useNavigate();
  return (
    <Box mt={-2}>
      <Tabs
        value={value}
        onChange={(_, v) => {
          _.preventDefault();
          setValue(v);
          const r = tabRouteMapping.get(v)!;
          setTimeout(() => {
            navigate(r);
          }, 300);
        }}
        sx={[toSx(tabsStyles, tabsClasses), ...(Array.isArray(sx) ? sx : [sx])]}
      >
        <Tab
          disableRipple
          sx={tabItemSx}
          label="Expense Classes"
          value="expense-classes"
        />
        <Tab
          disableRipple
          sx={tabItemSx}
          label="Expense Names"
          value="expense-names"
        />
      </Tabs>
      <Box mt={2}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default SettingsTabLayout;
