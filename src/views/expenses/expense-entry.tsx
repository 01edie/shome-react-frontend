import {
  Box,
  Button,
  Divider,
  Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { formFields, formSchema } from "./form-config";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormController from "../../components/form/controller";
import { ExpenseTypeOptions } from "../../constants/modules";
import LoadingButton from "@mui/lab/LoadingButton";
import { useExpenseNamesListData } from "../../hooks/use-list-data";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useBoardersGridData } from "../../hooks/use-boarders";
import { useEmployeesGridData } from "../../hooks/use-employees";
import { useAddExpense } from "../../hooks/use-expenses";
import { ExpenseCore } from "../../types/models";
import { parseAmount } from "../../utils/app-utils";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/query-keys";

type Props = {
  onClose: () => void;
};
type FormSchema = typeof formSchema._type;


function ExpenseEntry({ onClose }: Props) {
  const queryClient = useQueryClient();
  const { data: expenseNamesOptions, isFetching: expenseNamesOptionsLoading } =
    useExpenseNamesListData();
  const { data: boardersOptions, isFetching: boardersOptionsLoading } =
    useBoardersGridData();
  const { data: employeesOptions, isFetching: employeesOptionsLoading } =
    useEmployeesGridData();
  const { mutateAsync: addExpense, isPending } = useAddExpense();

  const formElements = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expenseName: { id: "" },
      transactionDate: dayjs(),
      quantity: "1",
      totalAmount: "",
      userUnitAmount: "",
      isAssignLater: false,
      boarder: { id: "" },
      employee: { id: "" },
      description: "",
      notes: "",
    },
  });
  const {
    expenseName,
    transactionDate,
    description,
    totalAmount,
    userUnitAmount,
    quantity,
    isAssignLater,
    boarder,
    employee,
    notes,
  } = formFields;

  const watchExpenseName = formElements.watch("expenseName");
  const watchIsAssignLater = formElements.watch("isAssignLater");

  // console.log("errors", formElements.formState.errors);
  const submitHandler = async (values: FormSchema) => {
    console.log(values);
    const totalAmount = parseAmount(values.totalAmount);
    const quantity = +values.quantity;
    const userUnitAmount = values.userUnitAmount
      ? parseAmount(values.userUnitAmount)
      : totalAmount / quantity;
    const newVal: ExpenseCore = {
      expenseNameId: +values.expenseName.id,
      quantity,
      totalAmount,
      userUnitAmount,
      transactionDate: values.transactionDate,
      transactionType: values.expenseName.transactionType,
      isAssignLater: values.isAssignLater,
      boarderId: values.boarder.id ? +values.boarder.id : undefined,
      employeeId: values.employee.id ? +values.employee.id : undefined,
      description: values.description,
      notes: values.notes,
    };

    await addExpense({ newData: { ...newVal } });
    formElements.reset();
    queryClient.refetchQueries({ queryKey: [QUERY_KEYS.expenses] });
    if (values.isAssignLater)
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.inventory] });
  };
  return (
    <Box width={450} bgcolor="#f9f9f9" height="100%">
      <Typography align="center" my={1} variant="h6">
        Add Expense
      </Typography>
      <Divider />
      <Box
        p={1}
        component="form"
        onSubmit={formElements.handleSubmit(submitHandler)}
      >
        <FormProvider {...formElements}>
          <Stack spacing={1.5} mt={1}>
            <FormController
              {...expenseName}
              options={expenseNamesOptions ?? []}
              getOptionLabel={(opt) => opt?.expenseName ?? ""}
            />

            <FormController {...transactionDate} />

            <FormController {...description} multiline rows={2} />
            <Grid container spacing={1}>
              <Grid size={6}>
                <FormController {...quantity} />
              </Grid>
              <Grid size={6}>
                <FormController {...totalAmount} />
              </Grid>
            </Grid>

            {watchExpenseName?.transactionType === "boarder_expense" ||
            watchExpenseName?.transactionType === "employee_expense" ? (
              <Grid container spacing={1}>
                <Grid size={6}>
                  <FormController {...isAssignLater} />
                </Grid>
                <Grid size={6}>
                  <FormController {...userUnitAmount} />
                </Grid>
              </Grid>
            ) : null}

            {watchExpenseName?.transactionType === "boarder_expense" &&
            !watchIsAssignLater ? (
              <FormController
                {...boarder}
                options={boardersOptions ?? []}
                getOptionLabel={(opt) =>
                  opt?.firstName ? opt.firstName + opt.lastName : ""
                }
              />
            ) : null}
            {watchExpenseName?.transactionType === "employee_expense" &&
            !watchIsAssignLater ? (
              <FormController
                {...employee}
                options={employeesOptions ?? []}
                getOptionLabel={(opt) =>
                  opt?.firstName ? opt.firstName + opt.lastName : ""
                }
              />
            ) : null}

            <FormController {...notes} multiline rows={2} />
          </Stack>
          {/* <FormController {...isInventoryItem} /> */}
          <Stack direction="row" justifyContent="end" mt={2} spacing={1.5}>
            <Button
              size="small"
              disabled={isPending}
              variant="outlined"
              onClick={onClose}
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              size="small"
              loading={isPending}
              variant="contained"
            >
              Save
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Box>
    </Box>
  );
}

export default ExpenseEntry;
