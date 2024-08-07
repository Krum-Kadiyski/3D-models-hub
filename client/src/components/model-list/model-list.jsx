import { Grid } from "@mui/material";
import { ModelCard } from "../model-card";

const ModelList = ({ models }) => (
  <Grid container spacing={2}>
    {models.map((model) => (
      <Grid
        item
        xs={3}
        key={model._id}
        sx={{ minWidth: 250, maxWidth: 300, pl: 0.5, pr: 0.5 }}
      >
        <ModelCard model={model} />
      </Grid>
    ))}
  </Grid>
);

export default ModelList;
