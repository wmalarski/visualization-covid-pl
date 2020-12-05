import { makeStyles, Theme, Typography } from "@material-ui/core";
import Chip from "@material-ui/core/Chip/Chip";
import Grid from "@material-ui/core/Grid/Grid";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import TextField from "@material-ui/core/TextField/TextField";
import SearchIcon from "@material-ui/icons/Search";
import React, { useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useMetadata from "../../common/hooks/useMetadata";
import {
  visualizationRegionsSelector,
  visualizationTimeRangeSelector,
} from "../../visualization/selectors";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  form: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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

export default function VisualizationController(): JSX.Element | null {
  const classes = useStyles();

  // const dispatch = useRootDispatch();
  const regions = useSelector(visualizationRegionsSelector);
  const range = useSelector(visualizationTimeRangeSelector);

  console.log("VisualizationController", regions, range);

  const { data } = useMetadata();
  const allRegions = useMemo(() => data?.population.map(r => r.region) ?? [], [
    data?.population,
  ]);
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
    <div className={classes.paper}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Grid container alignItems="center" alignContent="center" spacing={1}>
          <Grid item xs={12}>
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
          <Grid item xs={6}>
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
          <Grid item xs={6}>
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
        <div>
          <IconButton type="submit">
            <SearchIcon />
          </IconButton>
        </div>
      </form>
    </div>
  );
}
