import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { useRatings } from "../../hooks";

const ModelCard = ({ model }) => {
  const { averageRating } = useRatings(model._id);

  return (
    <Link to={`/models/${model._id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          height: 320,
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            boxShadow: 8,
          },
        }}
      >
        <CardMedia
          component="img"
          height="140"
          alt={model.name}
          image={model.image}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {model.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ wordBreak: "break-word", mb: 1 }}
          >
            {model.description.length > 55
              ? `${model.description.slice(0, 51)}...`
              : model.description}
          </Typography>
          <Box
            display="flex"
            flex={1}
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Rating readOnly value={averageRating} size="small" />
            <Typography variant="caption" color="text.secondary">
              {new Date(model._createdOn).toLocaleDateString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ModelCard;
