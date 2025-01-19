import {
  Box,
  Divider,
  Grid2 as Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormController from "../../components/form/controller";
import { formFields, formSchema } from "./form-config";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import AppButton from "../../components/form/app-button";
import FormLegend from "../../components/form/form-legend";
import { useQueryClient } from "@tanstack/react-query";
import { useExpenseNamesListData } from "../../hooks/use-list-data";
import { useBoardersGridData } from "../../hooks/use-boarders";
import {
  useAddExpense,
  useEditExpense,
  useExpensesGridData,
} from "../../hooks/use-expenses";
import { useEmployeesGridData } from "../../hooks/use-employees";
import { useNavigate, useParams } from "react-router-dom";
import { parseAmount } from "../../utils/app-utils";
import { ExpenseCore, ExpenseGridItem } from "../../types/models";
import { QUERY_KEYS } from "../../constants/query-keys";
import { APP_ROUTES } from "../../constants/routes";

type Props = {};
type FormSchema = typeof formSchema._type;

function ExpenseForm({}: Props) {
  const queryClient = useQueryClient();
  const { data: expenseNamesOptions, isFetching: expenseNamesOptionsLoading } =
    useExpenseNamesListData();
  const { data: boardersOptions, isFetching: boardersOptionsLoading } =
    useBoardersGridData();
  const { data: employeesOptions, isFetching: employeesOptionsLoading } =
    useEmployeesGridData();
  const { data: expensesData, isFetching: expensesDataLoading } =
    useExpensesGridData();
  const { mutateAsync: addExpense, isPending } = useAddExpense();
  const { mutateAsync: editExpense, isPending: isPendingEdit } =
    useEditExpense();

  const navigate = useNavigate();
  const { id } = useParams();

  const onClose = () => {
    navigate(APP_ROUTES.expenses);
  };

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

  const watchExpenseName = formElements.watch("expenseName");
  const watchIsAssignLater = formElements.watch("isAssignLater");

  const {
    transactionDate,
    expenseName,
    description,
    quantity,
    totalAmount,
    isAssignLater,
    boarder,
    employee,
    userUnitAmount,
    notes,
  } = formFields;

  const submitHandler = async (values: FormSchema) => {
    const totalAmount = parseAmount(values.totalAmount);
    const quantity = +values.quantity;
    const userUnitAmount = values.userUnitAmount
      ? parseAmount(values.userUnitAmount)
      : +(totalAmount / quantity).toFixed(2);
    const newData: ExpenseCore = {
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

    if (id) {
      await editExpense({ newData, id });
    } else {
      await addExpense({ newData });
    }
    formElements.reset();
    queryClient.refetchQueries({ queryKey: [QUERY_KEYS.expenses] });
    if (values.isAssignLater)
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.inventory] });
    onClose();
  };

  useEffect(() => {
    if (
      expensesDataLoading ||
      boardersOptionsLoading ||
      employeesOptionsLoading
    ) {
      return;
    }
    if (id && expensesData) {
      const eD = expensesData as ExpenseGridItem[];
      const cE = eD.find((e) => e.id == id);
      if (cE) {
        formElements.reset({
          expenseName: expenseNamesOptions?.find(
            (e: any) => e.id === cE.expenseNameId
          ),
          transactionDate: dayjs(cE.transactionDate),
          quantity: String(cE.quantity),
          totalAmount: cE.totalAmount,
          description: cE.description,
          notes: cE.notes,
          isAssignLater: cE.isAssignLater,
          userUnitAmount: String(cE?.userUnitAmount),
          boarder: boardersOptions.find(
            (e: any) => e.boarderId === cE.boarderId
          ) ?? { id: "" },
          employee: employeesOptions.find(
            (e: any) => e.employeeId === cE.employeeId
          ) ?? { id: "" },
        });
      }
    }
  }, [id, expensesData, boardersOptions, employeesOptions]);

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 2,
        width: { xs: "100%", md: "75%" },
        marginX: "auto",
      }}
      elevation={2}
    >
      <Typography variant="h5">{id ? "Edit" : "New"} Expense</Typography>
      <Divider sx={{ mt: 1 }} />
      {isPending ||
      isPendingEdit ||
      boardersOptionsLoading ||
      employeesOptionsLoading ||
      expenseNamesOptionsLoading ? (
        <LinearProgress sx={{ mt: 1 }} />
      ) : null}
      <Box
        p={1}
        pt={0}
        component="form"
        onSubmit={formElements.handleSubmit(submitHandler)}
      >
        <FormProvider {...formElements}>
          <Grid container spacing={1.25}>
            <Grid size={{ xs: 12 }}>
              <FormLegend title="Transaction Details" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormController
                {...expenseName}
                options={expenseNamesOptions ?? []}
                getOptionLabel={(opt) => opt?.expenseName ?? ""}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormController {...transactionDate} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormController {...quantity} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormController {...totalAmount} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormController {...description} />
            </Grid>

            {watchExpenseName?.transactionType === "boarder_expense" ||
            watchExpenseName?.transactionType === "employee_expense" ? (
              <>
                <Grid size={{ xs: 12 }}>
                  <FormLegend title="Assignment Details" />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormController {...isAssignLater} />
                </Grid>
                {watchExpenseName?.transactionType === "boarder_expense" &&
                !watchIsAssignLater ? (
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormController
                      {...boarder}
                      options={boardersOptions ?? []}
                      getOptionLabel={(opt) =>
                        opt?.firstName ? opt.firstName + opt.lastName : ""
                      }
                    />
                  </Grid>
                ) : null}
                {watchExpenseName?.transactionType === "employee_expense" &&
                !watchIsAssignLater ? (
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormController
                      {...employee}
                      options={employeesOptions ?? []}
                      getOptionLabel={(opt) =>
                        opt?.firstName ? opt.firstName + opt.lastName : ""
                      }
                    />
                  </Grid>
                ) : null}

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormController {...userUnitAmount} />
                </Grid>
              </>
            ) : null}
          </Grid>
          <Box mt={2}>
            <FormController {...notes} multiline rows={2} />
          </Box>

          <Stack direction="row" justifyContent="end" mt={2} spacing={1.5}>
            <AppButton
              disabled={isPending || isPendingEdit}
              variant="outlined"
              onClick={onClose}
            >
              Cancel
            </AppButton>
            <AppButton
              type="submit"
              loading={
                isPending ||
                isPendingEdit ||
                boardersOptionsLoading ||
                employeesOptionsLoading ||
                expenseNamesOptionsLoading ||
                expensesDataLoading
              }
              variant="contained"
            >
              Save
            </AppButton>
          </Stack>
        </FormProvider>
      </Box>
    </Paper>
  );
}

export default ExpenseForm;
