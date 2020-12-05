import { makeStyles, Theme, Typography } from "@material-ui/core";
import Chip from "@material-ui/core/Chip/Chip";
import Grid from "@material-ui/core/Grid/Grid";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import TextField from "@material-ui/core/TextField/TextField";
import CloseIcon from "@material-ui/icons/Close";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import useMetadata from "../../common/hooks/useMetadata";
import { useRootDispatch } from "../../common/store";
import {
  visualizationRegionsSelector,
  visualizationTimeRangeSelector,
} from "../../visualization/selectors";
import { setRegions, setTimeRange } from "../../visualization/slice";
import { getDefaultRange } from "../functions";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
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

export default function ViewsController(): JSX.Element | null {
  const classes = useStyles();

  const dispatch = useRootDispatch();
  const regions = useSelector(visualizationRegionsSelector);
  const range = useSelector(visualizationTimeRangeSelector);

  const { data } = useMetadata();
  const allRegions = useMemo(() => data?.population.map(r => r.region) ?? [], [
    data?.population,
  ]);
  const defaultRange = useMemo(() => getDefaultRange(data), [data]);

  return (
    <div className={classes.paper}>
      <Grid container alignItems="center" alignContent="center" spacing={1}>
        <Grid item xs={11}>
          <Typography variant="caption" color="textSecondary">
            Regions
          </Typography>
          <Select
            multiple
            fullWidth
            value={regions ?? []}
            onChange={event =>
              dispatch(setRegions(event.target.value as string[]))
            }
            renderValue={selected => {
              const selectedRegions = selected as string[];
              return (
                <div className={classes.chips}>
                  {selectedRegions.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              );
            }}
          >
            {allRegions.map(region => (
              <MenuItem key={region} value={region}>
                <ListItemText primary={region} />
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => dispatch(setRegions([]))}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Grid>
        <Grid item xs={5}>
          <TextField
            name="startDate"
            label="From"
            type="date"
            fullWidth
            value={range?.fromDate ?? defaultRange.fromDate}
            onChange={event =>
              dispatch(
                setTimeRange({
                  fromDate: event.target.value,
                  toDate: range?.toDate,
                }),
              )
            }
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() =>
              dispatch(
                setTimeRange({
                  fromDate: defaultRange.fromDate,
                  toDate: range?.toDate,
                }),
              )
            }
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Grid>
        <Grid item xs={5}>
          <TextField
            name="endDate"
            label="To"
            type="date"
            fullWidth
            value={range?.toDate ?? defaultRange.toDate}
            onChange={event =>
              dispatch(
                setTimeRange({
                  fromDate: range?.fromDate,
                  toDate: event.target.value,
                }),
              )
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() =>
              dispatch(
                setTimeRange({
                  fromDate: range?.fromDate,
                  toDate: defaultRange.toDate,
                }),
              )
            }
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}
