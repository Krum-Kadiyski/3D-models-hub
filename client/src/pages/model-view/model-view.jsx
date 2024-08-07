import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Tabs, Tab, Rating, Divider } from "@mui/material";
import ThreeDRotationSharpIcon from "@mui/icons-material/ThreeDRotationSharp";
import { useUser, useRatings } from "../../hooks";
import { formatQueryParams, restService } from "../../helpers";
import { ModelViewer } from "../../components/model-viewer";
import { ConditionalWrapper } from "../../components/conditional-wrapper";
import { Tooltip } from "../../components/tooltip";
import ActionButtons from "./action-buttons";

const ViewModelPage = () => {
  const navigate = useNavigate();
  const { modelId } = useParams();
  const { user } = useUser();
  const {
    isLoading: areRatingsLoading,
    averageRating,
    currentUserRating,
    handleRate,
  } = useRatings(modelId, user._id);

  const [model, setModel] = useState(null);
  const [activeTab, setActiveTab] = useState("details");

  const createdOn = new Date(model?._createdOn).toLocaleString();
  const hasRated = !!currentUserRating;
  const isOwner = model?._ownerId === user._id;
  const isRatingDisabled = isOwner || hasRated;

  const handleTabChange = (_event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const fetchModel = async () => {
      const params = new URLSearchParams({
        load: `author=_ownerId:users`,
      });

      const { data, error } = await restService.get(
        `/data/models/${modelId}?${formatQueryParams(params)}`
      );

      if (!error) {
        setModel(data);
      } else {
        navigate("/404");
      }
    };

    fetchModel();
  }, [modelId, navigate]);

  if (!model) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box display="flex" flexDirection="column" width={900} height={600}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" sx={{ wordBreak: "break-word" }}>
          {model.name}
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Typography variant="caption">
            Created by:{" "}
            <Link to={`/profile/${model.author.username}`}>
              {model.author.username}
            </Link>
          </Typography>
          <Typography variant="caption">{createdOn}</Typography>
        </Box>
      </Box>
      <Box display="flex" mt={2}>
        <Box display="flex" flexDirection="column" mr={2}>
          <Tabs
            orientation="vertical"
            value={activeTab}
            onChange={handleTabChange}
          >
            <Tab label="Details" value="details" />
            <Tab
              value="model"
              icon={<ThreeDRotationSharpIcon />}
              iconPosition="start"
            />
          </Tabs>
          <ActionButtons model={model} />
        </Box>
        {activeTab === "details" && (
          <Box width={690} minHeight={550}>
            <Box
              width="100%"
              height={200}
              sx={{
                backgroundImage: `url(${model.image})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              alt={model.name}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={1}
            >
              <Typography variant="h6" pr={1}>
                Rating:
              </Typography>
              <ConditionalWrapper
                condition={isRatingDisabled}
                wrapper={(children) => (
                  <Tooltip
                    title={
                      isOwner
                        ? "You can't rate your own model"
                        : `You've already rated this model with a ${currentUserRating.rating} star rating`
                    }
                  >
                    {children}
                  </Tooltip>
                )}
              >
                <span
                  style={{
                    cursor: isRatingDisabled ? "not-allowed" : "pointer",
                  }}
                >
                  <Rating
                    disabled={areRatingsLoading}
                    readOnly={isRatingDisabled}
                    value={averageRating}
                    onChange={handleRate}
                  />
                </span>
              </ConditionalWrapper>
            </Box>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography
              variant="h6"
              sx={{
                maxHeight: 300,
                wordBreak: "break-word",
                overflowY: "auto",
              }}
            >
              {model.description}
            </Typography>
          </Box>
        )}
        {activeTab === "model" && (
          <Box width={690} height={550}>
            <ModelViewer url={model.file} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ViewModelPage;
