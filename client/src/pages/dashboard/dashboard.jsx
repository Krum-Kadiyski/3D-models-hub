import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { Statistic } from "../../components/statistic";
import { ModelList } from "../../components/model-list";
import { useUser, useModels } from "../../hooks";
import { formatQueryParams, restService } from "../../helpers";

const HomePage = () => {
  const navigate = useNavigate();

  const [totalModels, setTotalModels] = useState(0);
  const [totalCreators, setTotalCreators] = useState(0);
  const [topRatedModels, setTopRatedModels] = useState([]);

  const { isLoggedIn } = useUser();
  const { models } = useModels(
    {
      pageSize: 4,
      sort: "_createdOn desc",
    },
    { skipTotal: true }
  );

  const handleCreate = () => {
    navigate("/create-model");
  };

  useEffect(() => {
    const fetchTotalModels = async () => {
      const { data, error } = await restService.get("/data/models?count");

      if (!error) {
        setTotalModels(data);
      }
    };

    const fetchNumberOfCreators = async () => {
      const params = new URLSearchParams({
        distinct: "_ownerId",
      });

      const { data, error } = await restService.get(
        `/data/models?count&${formatQueryParams(params)}`
      );

      if (!error) {
        setTotalCreators(data);
      }
    };

    const fetchRatings = async () => {
      const { data, error } = await restService.get(`/data/ratings?topRated`);

      if (!error) {
        setTopRatedModels(data);
      }
    };

    fetchRatings();
    fetchTotalModels();
    fetchNumberOfCreators();
  }, []);

  return (
    <>
      <Box>
        <Typography variant="h3" align="center" gutterBottom>
          Welcome to the 3D Model Marketplace
        </Typography>
        <Box display="flex" flexDirection="row" justifyContent="center" gap={2}>
          <Statistic title="Available models" value={totalModels} />
          <Statistic title="Number of creators" value={totalCreators} />
        </Box>
        {totalModels > 0 ? (
          <>
            <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
              Newest models
            </Typography>
            <ModelList models={models} />
            {topRatedModels.length > 0 && (
              <>
                <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
                  Top rated models
                </Typography>
                <ModelList models={topRatedModels} />
              </>
            )}
            <Box sx={{ pb: 5 }} />
          </>
        ) : (
          <>
            {isLoggedIn && (
              <Box display="flex" justifyContent="center">
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={handleCreate}
                  sx={{
                    mt: 2,
                  }}
                >
                  Be the first to upload a model
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default HomePage;
