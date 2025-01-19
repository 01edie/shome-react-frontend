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
import { bloodGroups, formFields, formSchema } from "./form-config";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import LoadingButton from "@mui/lab/LoadingButton";
import AppButton from "../../components/form/app-button";
import FormLegend from "../../components/form/form-legend";
import { useNavigate, useParams } from "react-router-dom";
import { APP_ROUTES } from "../../constants/routes";
import {
  useAddBoarder,
  useBoardersGridData,
  useEditBoarder,
} from "../../hooks/use-boarders";
import { Boarder, BoarderCore } from "../../types/models";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/query-keys";

type Props = {};
type FormSchema = typeof formSchema._type;

function BorderForm({}: Props) {
  const {
    data: boarders,
    isFetching: boardersIsFetching,
    refetch,
  } = useBoardersGridData();
  const { mutateAsync: addBoarder, isPending } = useAddBoarder();
  const { mutateAsync: editBoarder, isPending: isPendingEdit } =
    useEditBoarder();
  const navigate = useNavigate();

  const { id } = useParams();
  const onClose = () => {
    navigate(APP_ROUTES.boarders);
  };

  const formElements = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: null,
      contactNumber: "",
      guardianName: "",
      emergencyContact: "",
      bloodGroup: { id: "" },
      medicalCondition: "",
      allergies: "",
      notes: "",
      joiningDate: dayjs(),
      roomNo: "",
      active: true,
    },
  });
  const {
    firstName,
    lastName,
    dob,
    contactNumber,
    guardianName,
    emergencyContact,
    bloodGroup,
    specialNeeds,
    medicalCondition,
    allergies,
    notes,
    joiningDate,
    roomNo,
    active,
    leavingDate,
  } = formFields;

  const submitHandler = async (values: FormSchema) => {

    const newData: BoarderCore = {
      ...values,
      dob: values.dob,
      bloodGroup: values.bloodGroup.id,
      notes: values.notes || "",
      roomNo: values.roomNo ? +values.roomNo : undefined,
      joiningDate: values.joiningDate,
      medicalCondition: values.medicalCondition || "",
      specialNeeds: values.specialNeeds || "",
      allergies: values.allergies || "",
      contactNumber: values.contactNumber || "",
      leavingDate: values.active ? null : values.leavingDate,
    };

    if (id) {
      await editBoarder({ newData, id });
    } else {
      await addBoarder({ newData });
    }
    refetch();
    onClose();
  };

  useEffect(() => {
    if (boardersIsFetching) {
      return;
    }
    if (id && boarders) {
      const tmp = boarders as Boarder[];
      const b = tmp.find((e) => e.id == id);
      if (b) {
        formElements.reset({
          firstName: b.firstName,
          lastName: b.lastName,
          dob: dayjs(b.dob),
          bloodGroup: bloodGroups.find((bg) => bg.id === b.bloodGroup),
          contactNumber: b.contactNumber,
          allergies: b.allergies,
          medicalCondition: b.medicalCondition,
          specialNeeds: b.specialNeeds,
          guardianName: b.guardianName,
          emergencyContact: b.emergencyContact,
          joiningDate: dayjs(b.joiningDate),
          notes: b.notes,
          roomNo: b.roomNo ? String(b.roomNo) : "",
          active: b.active,
          leavingDate: b.leavingDate && dayjs(b.leavingDate),
        });
      }
    }
  }, [id, boarders]);


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
      <Typography variant="h5">{id ? "Edit" : "New"} Boarder</Typography>
      <Divider sx={{ mt: 1 }} />
      {isPending || boardersIsFetching ? (
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
              <FormController {...dob} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormController {...contactNumber} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormController {...guardianName} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormController {...emergencyContact} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormLegend title="Medical Information" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormController {...bloodGroup} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormController {...allergies} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormController {...medicalCondition} multiline rows={2} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormController {...specialNeeds} multiline rows={2} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormController {...notes} multiline rows={2} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormLegend title="Admission Information" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormController {...joiningDate} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormController {...roomNo} />
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
              onClick={onClose}
            >
              Cancel
            </AppButton>
            <AppButton
              type="submit"
              loading={isPending || isPendingEdit || boardersIsFetching}
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

export default BorderForm;
