import { useSearchParams } from "react-router-dom";
import { Divider, Paper, Typography, useTheme } from "@mui/material";
import { Search } from "../../components/search";
import { Sort } from "../../components/sort";
import { useModels } from "../../hooks";

const ModelsPageDetails = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;
  const sort = {
    sortBy: searchParams.get("sortBy") || "_createdOn",
    order: searchParams.get("order"),
  };
  const { total } = useModels({
    where: `name like "${query}"`,
    sortBy: `${sort.sortBy} ${sort.order ?? ""}`,
    offset: (page - 1) * 8,
  });

  return (
    <>
      <Divider sx={{ m: 2 }} />
      <Paper
        elevation={3}
        sx={{
          m: 2,
          mb: 2,
          p: 1,
          textAlign: "center",
          color: "white",
          bgcolor: theme.palette.secondary.main,
        }}
      >
        <Typography variant="h6">
          {total} {total === 1 ? "Model" : "Models"}
        </Typography>
      </Paper>
      <Paper variant="outlined" sx={{ m: 2, mt: 0.5, mb: 0.5 }}>
        <Search />
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          m: 2,
          mt: 0.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Sort />
      </Paper>
    </>
  );
};

export default ModelsPageDetails;
