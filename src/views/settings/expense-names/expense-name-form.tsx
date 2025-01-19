import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formFields, formSchema } from "./form-config";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack } from "@mui/material";
import FormController from "../../../components/form/controller";
import {
  useCreateExpenseName,
  useEditExpenseName,
  useExpenseClassesListData,
} from "../../../hooks/use-list-data";
import LoadingButton from "@mui/lab/LoadingButton";
import { ExpenseNameCore, ExpenseNameGridItem } from "../../../types/models";
import { ExpenseTypeOptions } from "../../../constants/modules";
import AppButton from "../../../components/form/app-button";

type Props = {
  onClose: () => void;
  refetch: () => void;
  editData?: ExpenseNameGridItem;
};
type FormSchema = typeof formSchema._type;

const defOption = {
  id: "",
};

function ExpenseNameForm({ onClose, refetch, editData }: Props) {
  const { data: expenseClassOptions, isFetching: expenseClassOptionsLoading } =
    useExpenseClassesListData();
  const { mutateAsync: createExpenseName, isPending } = useCreateExpenseName();
  const { mutateAsync: ediExpenseName, isPending: isPendingEdit } =
    useEditExpenseName();

  const formElements = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expenseName: editData?.expenseName ?? "",
      expenseType: ExpenseTypeOptions.find(
        (e) => e.id === editData?.transactionType
      ),
      expenseClass: editData?.expenseClass ?? defOption,
      isInventoryItem: Boolean(editData?.isInventoryItem),
      unit: editData?.unit ?? "",
    },
  });
  const { expenseName, expenseType, expenseClass, unit, isInventoryItem } =
    formFields;

  const submitHandler = async (values: FormSchema) => {
    const newVal: ExpenseNameCore = {
      expenseName: values.expenseName,
      expenseClassId: values.expenseClass.id,
      transactionType: values.expenseType.id,
      unit: values.unit,
      isInventoryItem: values.isInventoryItem,
    };
    if (!editData) {
      await createExpenseName({ newData: newVal });
    } else {
      await ediExpenseName({ newData: { ...newVal, id: editData.id } });
    }
    refetch();
    onClose();
  };

  return (
    <Box component="form" onSubmit={formElements.handleSubmit(submitHandler)}>
      <FormProvider {...formElements}>
        <Stack spacing={1.5} mt={1}>
          <FormController {...expenseName} />
          <FormController {...expenseType} options={ExpenseTypeOptions} />
          <FormController
            {...expenseClass}
            options={expenseClassOptions ?? []}
            loading={expenseClassOptionsLoading}
            getOptionLabel={(opt) => opt?.className ?? ""}
            slotProps={{ listbox: { sx: { maxHeight: "150px !important" } } }}
          />
          <FormController {...unit} />
        </Stack>
        <FormController {...isInventoryItem} />
        <Stack direction="row" justifyContent="end" mt={1} spacing={1.5}>
          <AppButton
            disabled={isPending || isPendingEdit}
            variant="outlined"
            onClick={onClose}
          >
            Cancel
          </AppButton>
          <AppButton
            type="submit"
            loading={isPending || isPendingEdit}
            variant="contained"
          >
            Save
          </AppButton>
        </Stack>
      </FormProvider>
    </Box>
  );
}

export default ExpenseNameForm;
