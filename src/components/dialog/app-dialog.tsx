import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
};

function AppDialog({ open, onClose, title, description, children }: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle bgcolor="#dbdbdb" sx={{ py: 1.5 }}>
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          bgcolor: "#f9f9f9",
          pt: "8px !important",
          width: { xs: 300, sm: 350, md: 400 },
        }}
      >
        {description ? (
          <DialogContentText>{description}</DialogContentText>
        ) : null}
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default AppDialog;
