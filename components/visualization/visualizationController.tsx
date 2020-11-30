import { makeStyles, Theme, Typography } from "@material-ui/core";
import Chip from "@material-ui/core/Chip/Chip";
import Grid from "@material-ui/core/Grid/Grid";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Paper from "@material-ui/core/Paper/Paper";
import Select from "@material-ui/core/Select/Select";
import TextField from "@material-ui/core/TextField/TextField";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import React, { useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useMetadata from "../../utils/common/useMetadata";
import { useRootDispatch } from "../../utils/store";
import {
  visualizationRegionsSelector,
  visualizationTimeRangeSelector,
} from "../../utils/visualization/selectors";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
  },
  form: {
    display: "flex",
    flexDirection: "row",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));

type ControllerFormType = {
  regions: string[];
  startDate: Date;
  endDate: Date;
};

export interface VisualizationControllerProps {
  onCloseClicked: () => void;
}

export default function VisualizationController(
  props: VisualizationControllerProps,
): JSX.Element | null {
  const { onCloseClicked } = props;

  const classes = useStyles();

  const dispatch = useRootDispatch();
  const regions = useSelector(visualizationRegionsSelector);
  const range = useSelector(visualizationTimeRangeSelector);

  console.log("VisualizationController", regions, range);

  const { spreadsheetData } = useMetadata();
  const allRegions = useMemo(
    () => spreadsheetData?.population.map(r => r.region) ?? [],
    [spreadsheetData?.population],
  );
  // const defaultRange = useMemo();

  const { handleSubmit, register, control } = useForm<ControllerFormType>({
    defaultValues: {
      regions: [],
      endDate: new Date(),
      startDate: new Date(),
    },
  });

  const onSubmit = useCallback(
    (data: ControllerFormType): void => console.log("onSubmit", data),
    [],
  );

  return (
    <Paper elevation={3} className={classes.paper}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Grid container alignItems="center" alignContent="center" spacing={1}>
          <Grid item xs={6}>
            <Typography variant="caption" color="textSecondary">
              Regions
            </Typography>
            <Controller
              control={control}
              name="regions"
              as={
                <Select
                  multiple
                  fullWidth
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {(selected as string[]).map(value => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  margin="none"
                  // MenuProps={MenuProps}
                >
                  {allRegions.map(region => (
                    <MenuItem key={region} value={region}>
                      <ListItemText primary={region} />
                    </MenuItem>
                  ))}
                </Select>
              }
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              inputRef={register}
              name="startDate"
              label="From"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              inputRef={register}
              name="endDate"
              label="To"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <div className={classes.form}>
          <IconButton type="submit" size="small">
            <SearchIcon />
          </IconButton>
          <IconButton size="small" onClick={onCloseClicked}>
            <CloseIcon />
          </IconButton>
        </div>
      </form>
    </Paper>
  );
}
