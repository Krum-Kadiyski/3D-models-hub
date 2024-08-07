import { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Box, Pagination, Paper, Typography, useTheme } from "@mui/material";
import { ModelList } from "../../components/model-list";
import { useUser } from "../../hooks";
import { formatQueryParams, restService } from "../../helpers";

const pageSize = 8;

const ProfilePage = () => {
  const theme = useTheme();
  const { user } = useUser();
  const { userId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userModels, setUserModels] = useState([]);
  const [totalModels, setTotalModels] = useState(0);

  const page = Number(searchParams.get("page")) || 1;
  const pages = useMemo(() => Math.ceil(totalModels / pageSize), [totalModels]);

  const handlePageChange = (_event, newPage) => {
    searchParams.set("page", newPage);

    setSearchParams(searchParams);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await restService.get(`/users/${userId}`);

      if (!error) {
        setUserProfile(data);
      }
    };

    if (userId === user._id) {
      setUserProfile(user);
    } else {
      fetchUser();
    }
  }, [userId, user]);

  useEffect(() => {
    const fetchUserModels = async () => {
      const params = new URLSearchParams({
        pageSize,
        where: `_ownerId="${userProfile._id}"`,
        sortBy: "_createdOn desc",
        offset: (page - 1) * pageSize,
      });

      const { data, error } = await restService.get(
        `/data/models?${formatQueryParams(params)}`
      );

      if (!error) {
        setUserModels(data);
      }
    };

    if (userProfile?._id) {
      fetchUserModels();
    }
  }, [userProfile?._id, page]);

  useEffect(() => {
    const fetchTotalModels = async () => {
      const params = new URLSearchParams({
        where: `_ownerId="${userProfile._id}"`,
      });

      const { data, error } = await restService.get(
        `/data/models?count&${formatQueryParams(params)}`
      );

      if (!error) {
        setTotalModels(data);
      }
    };

    if (userProfile?._id) {
      fetchTotalModels();
    }
  }, [userProfile?._id]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <Paper
        elevation={10}
        sx={{
          mb: 2,
          p: 2,
          color: "white",
          bgcolor: theme.palette.secondary.main,
        }}
      >
        <Typography variant="h4" sx={{ mb: 1 }}>
          {userProfile.username}&apos;s models ({totalModels})
        </Typography>
      </Paper>
      <ModelList models={userModels} />
      <Pagination
        sx={{ m: 2, pb: 2 }}
        variant="outlined"
        color="primary"
        page={page}
        count={pages}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default ProfilePage;
