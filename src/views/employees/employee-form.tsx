import {
  Box,
  Button,
  Divider,
  Grid2 as Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import FormWrapper from "../../components/page/form-wrapper";
import { FormProvider, useForm } from "react-hook-form";
import FormController from "../../components/form/controller";
import { employeeRoles, formFields, formSchema } from "./form-config";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import LoadingButton from "@mui/lab/LoadingButton";
import AppButton from "../../components/form/app-button";
import FormLegend from "../../components/form/form-legend";
import { useNavigate, useParams } from "react-router-dom";
import { APP_ROUTES } from "../../constants/routes";
import {
  useAddEmployee,
  useEditEmployee,
  useEmployeesGridData,
} from "../../hooks/use-employees";
import { Employee, EmployeeCore } from "../../types/models";

type Props = {};
type FormSchema = typeof formSchema._type;

function EmployeeForm({}: Props) {
  const {
    data: employees,
    isFetching: employeesIsFetching,
    refetch,
  } = useEmployeesGridData();
  const { mutateAsync: addEmployee, isPending } = useAddEmployee();
  const { mutateAsync: editEmployee, isPending: isPendingEdit } =
    useEditEmployee();
  const navigate = useNavigate();

  const { id } = useParams();
  const onClose = () => {
    navigate(APP_ROUTES.employees);
  };
  const formElements = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      contactNumber: "",
      employeeRole: null,
      salary: "",
      joiningDate: dayjs(),
      notes: "",
      active: true,
    },
  });
  const {
    firstName,
    lastName,
    contactNumber,
    joiningDate,
    employeeRole,
    salary,
    notes,
    active,
    leavingDate,
  } = formFields;

  const submitHandler = async (values: FormSchema) => {
    const newData: EmployeeCore = {
      ...values,
      employeeRole: values.employeeRole?.id,
      joiningDate: values.joiningDate,
      leavingDate: values.active ? null : values.leavingDate,
    };
    if (id) {
      await editEmployee({ newData, id });
    } else {
      await addEmployee({ newData });
    }
    refetch();
    onClose();
  };

  useEffect(() => {
    if (employeesIsFetching) {
      return;
    }
    if (id && employees) {
      const tmp = employees as Employee[];
      const e = tmp.find((e) => e.id == id);
      if (e) {
        formElements.reset({
          firstName: e.firstName,
          lastName: e.lastName,
          joiningDate: dayjs(e.joiningDate),
          contactNumber: e.contactNumber,
          salary: e.salary,
          active: e.active,
          leavingDate: e.leavingDate && dayjs(e.leavingDate),
          employeeRole: employeeRoles.find((r) => r.id === e.employeeRole),
          notes: e.notes,
        });
      }
    }
  }, [id, employees]);

  const watchActive = formElements.watch("active");

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
      <Typography variant="h5">{id ? "Edit" : "New"} Employee</Typography>
      <Divider sx={{ mt: 1 }} />
      {isPending || isPending || employeesIsFetching ? (
        <LinearProgress sx={{ mt: 1 }} />
      ) : null}
      <Box
        p={1}
        component="form"
        onSubmit={formElements.handleSubmit(submitHandler)}
      >
        <FormProvider {...formElements}>
          <Grid container spacing={1.25}>
            <Grid size={{ xs: 12 }}>
              <FormLegend title="Personal Information*" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormController {...firstName} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormController {...lastName} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormController {...joiningDate} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormController {...contactNumber} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormLegend title="Employment Details" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormController {...employeeRole} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormController {...salary} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormController {...notes} multiline rows={2} />
            </Grid>
            {id ? (
              <Grid size={{ xs: 12, md: 6 }}>
                <FormController {...active} />
              </Grid>
            ) : null}
            {!watchActive ? (
              <Grid size={{ xs: 12, md: 6 }}>
                <FormController {...leavingDate} />
              </Grid>
            ) : null}
          </Grid>

          {/* <FormController {...isInventoryItem} /> */}
          <Stack direction="row" justifyContent="end" mt={2} spacing={1.5}>
            <AppButton
              disabled={isPending || isPendingEdit}
              variant="outlined"
              onClick={() => {
                navigate(APP_ROUTES.employees);
              }}
            >
              Cancel
            </AppButton>
            <AppButton
              type="submit"
              loading={isPending || isPendingEdit || employeesIsFetching}
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

export default EmployeeForm;
