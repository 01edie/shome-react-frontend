import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formFields, formSchema } from "./form-config";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack } from "@mui/material";
import FormController from "../../../components/form/controller";
import {
  useCreateExpenseClass,
  useEditExpenseClass,
} from "../../../hooks/use-list-data";
import LoadingButton from "@mui/lab/LoadingButton";
import { ExpenseClass } from "../../../types/models";

type Props = {
  onClose: () => void;
  refetch: () => void;
  editData?: ExpenseClass;
};
type FormSchema = typeof formSchema._type;

function ExpenseClassForm({ onClose, refetch, editData }: Props) {
  const { mutateAsync: createExpenseClass, isPending } =
    useCreateExpenseClass();
  const { mutateAsync: ediExpenseClass, isPending: isPendingEdit } =
    useEditExpenseClass();

  const formElements = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      className: editData?.className ?? "",
      description: editData?.description ?? "",
    },
  });
  const { className, description } = formFields;

  const submitHandler = async (values: FormSchema) => {
    if (!editData) {
      await createExpenseClass({ newData: values });
    } else {
      await ediExpenseClass({ newData: { ...values, id: editData.id } });
    }
    refetch();
    onClose();
  };

  return (
    <Box component="form" onSubmit={formElements.handleSubmit(submitHandler)}>
      <FormProvider {...formElements}>
        <Stack spacing={1.5} mt={1} minWidth={400}>
          <FormController {...className} />
          <FormController {...description} />
        </Stack>
        <Stack direction="row" justifyContent="end" spacing={1.5} mt={2}>
          <Button
            size="medium"
            disabled={isPending || isPendingEdit}
            variant="outlined"
            onClick={onClose}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            size="medium"
            loading={isPending || isPendingEdit}
            variant="contained"
          >
            Save
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
}

export default ExpenseClassForm;
