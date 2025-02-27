import ViewWrapper from "../../components/page/view-wrapper";
import {
  useAssignInventoryItem,
  useInventoryGridData,
} from "../../hooks/use-inventory";
import {
  Box,
  Button,
  Grid2 as Grid,
  InputAdornment,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";

import { useBoardersGridData } from "../../hooks/use-boarders";
import { useEmployeesGridData } from "../../hooks/use-employees";

import InventoryItem from "../../components/inventroy/inventory-item";
import AppDialog from "../../components/dialog/app-dialog";
import { useState } from "react";
import { formFields, formSchema } from "./form-config";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import FormController from "../../components/form/controller";
import LoadingButton from "@mui/lab/LoadingButton";
import { InventoryAssignment, InventoryGridItem } from "../../types/models";
import AppButton from "../../components/form/app-button";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/query-keys";

type Props = {};

type FormSchema = typeof formSchema._type;

function Inventory({}: Props) {
  const { data, isFetching, refetch } = useInventoryGridData();
  const { data: boardersOptions, isFetching: boardersOptionsLoading } =
    useBoardersGridData();
  const { data: employeesOptions, isFetching: employeesOptionsLoading } =
    useEmployeesGridData();
  const { mutateAsync: assign, isPending } = useAssignInventoryItem();
  const [formOpen, setFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryGridItem>();
  const queryClient = useQueryClient();

  const formElements = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantityToAssign: "",
      boarder: { id: "" },
      employee: { id: "" },
    },
  });

  const handleOpen = (id: string) => {
    const d: InventoryGridItem[] = data;
    const invD = d.find((e) => e.id === id);
    setSelectedItem(invD);
    formElements.setValue("transactionType", invD?.expense.transactionType!);
    setFormOpen(true);
  };

  const handleClose = () => {
    setFormOpen(false);
    setTimeout(() => {
      formElements.reset();
      setSelectedItem(undefined);
    }, 200);
  };

  const submitHandler = async (values: FormSchema) => {
    if (+values.quantityToAssign > (selectedItem?.quantity ?? 0)) {
      formElements.setError("quantityToAssign", {
        message: `Available quantity in stock: ${selectedItem?.quantity}`,
      });
      return;
    }
    const newData: InventoryAssignment = {
      quantityToAssign: +values.quantityToAssign,
      employeeId:
        values.transactionType === "employee_expense"
          ? +values.employee.id
          : undefined,
      boarderId:
        values.transactionType === "boarder_expense"
          ? +values.boarder.id
          : undefined,
    };

    await assign({ newData, id: selectedItem?.id! });

    refetch();
    queryClient.refetchQueries({ queryKey: [QUERY_KEYS.expenses] });
    handleClose();
  };

  const watchExpenseType = formElements.watch("transactionType");

  const { quantityToAssign, boarder, employee } = formFields;

  return (
    <>
      {isFetching ? <LinearProgress sx={{ mb: 1 }} /> : null}
      <Box
        sx={{
          textAlign: "center",
          padding: "1rem",
          border: "1px solid #eaeaea",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          minHeight: 400,
          position: "relative",
        }}
      >
        <Grid container spacing={1}>
          {data
            ? data.map((e: InventoryGridItem) => (
                <Grid key={e.id} size={{ xs: 12, md: 6, lg: 4 }}>
                  <InventoryItem
                    item={e.itemName}
                    quantity={e.quantity}
                    stockingDate={e.stockingDate}
                    unit={e.unit}
                    inUse={!!e.inUse}
                    onClick={() => {
                      handleOpen(e.id);
                    }}
                  />
                </Grid>
              ))
            : null}
        </Grid>
        {data?.length === 0 ? (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <FactCheckOutlinedIcon sx={{ fontSize: 64 }} />{" "}
            <Typography>Currently, no items is in inventory.</Typography>
          </Box>
        ) : null}
        <AppDialog
          title="Inventory Assignment"
          open={formOpen}
          onClose={handleClose}
        >
          <Box
            component="form"
            onSubmit={formElements.handleSubmit(submitHandler)}
          >
            <FormProvider {...formElements}>
              <Stack spacing={1.5} mt={1}>
                <FormController
                  {...quantityToAssign}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          {selectedItem?.unit}
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                {watchExpenseType === "boarder_expense" ? (
                  <FormController
                    {...boarder}
                    options={boardersOptions ?? []}
                    getOptionLabel={(opt) =>
                      opt?.firstName ? opt.firstName + " " + opt.lastName : ""
                    }
                  />
                ) : null}
                {watchExpenseType === "employee_expense" ? (
                  <FormController
                    {...employee}
                    options={employeesOptions ?? []}
                    getOptionLabel={(opt) =>
                      opt?.firstName ? opt.firstName + " " + opt.lastName : ""
                    }
                  />
                ) : null}
              </Stack>

              <Stack direction="row" justifyContent="end" mt={2} spacing={1.5}>
                <AppButton
                  size="medium"
                  disabled={isPending}
                  variant="outlined"
                  onClick={handleClose}
                >
                  Cancel
                </AppButton>
                <AppButton
                  type="submit"
                  size="medium"
                  loading={
                    isPending ||
                    boardersOptionsLoading ||
                    employeesOptionsLoading
                  }
                  variant="contained"
                >
                  Assign
                </AppButton>
              </Stack>
            </FormProvider>
          </Box>
        </AppDialog>
      </Box>
    </>
  );
}

export default ViewWrapper(Inventory, "Inventory");
