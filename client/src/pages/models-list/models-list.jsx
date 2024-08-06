import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Typography, Button, Pagination } from "@mui/material";
import { useUser, useModels } from "../../hooks";
import { ModelList } from "../../components/model-list";

const ModelsListPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoggedIn } = useUser();

  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;
  const sort = {
    sortBy: searchParams.get("sortBy") || "_createdOn",
    order: searchParams.get("order"),
  };
  const { areModelsLoading, models, pages } = useModels({
    where: `name like "${query}"`,
    sortBy: `${sort.sortBy} ${sort.order ?? ""}`,
    offset: (page - 1) * 8,
  });
  const handleCreate = () => {
    navigate("/create-model");
  };

  const handlePageChange = (_event, newPage) => {
    searchParams.set("page", newPage);

    setSearchParams(searchParams);
  };

  if (!areModelsLoading && !models.length) {
    return (
      <Box display="flex" flexDirection="column">
        <Typography variant="h5">No models found</Typography>
        {isLoggedIn && (
          <Button variant="contained" onClick={handleCreate} sx={{ mt: 1 }}>
            Create a model
          </Button>
        )}
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <ModelList models={models} />
      <Pagination
        variant="outlined"
        color="primary"
        page={page}
        count={pages}
        onChange={handlePageChange}
        sx={{ m: 2, pb: 2 }}
      />
    </Box>
  );
};

export default ModelsListPage;
