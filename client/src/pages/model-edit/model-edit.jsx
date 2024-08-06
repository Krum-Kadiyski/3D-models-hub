import { useState, useEffect, useId } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  OutlinedInput,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useUser } from "../../hooks";
import { restService } from "../../helpers";

const EditModelPage = () => {
  const navigate = useNavigate();
  const { modelId } = useParams();
  const { user } = useUser();

  const [isFetching, setIsFetching] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [model, setModel] = useState(null);
  const [errors, setErrors] = useState({ name: false, description: false });
  const [fields, setFields] = useState({ name: "", description: "" });

  const nameId = useId();
  const descriptionId = useId();

  const handleChange = (name) => (event) => {
    setFields((prevState) => ({
      ...prevState,
      [name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, description } = fields;

    if (!name || name.length > 30 || !description || description.length > 500) {
      setErrors({
        name: !name || name.length > 30,
        description: !description || description.length > 500,
      });

      return;
    }

    setIsUpdating(true);

    const { error } = await restService.patch(`/data/models/${modelId}`, {
      name,
      description,
    });

    setIsUpdating(false);

    if (!error) {
      navigate(`/models/${modelId}`);
    }
  };

  useEffect(() => {
    const fetchModel = async () => {
      const { data, error } = await restService.get(`/data/models/${modelId}`);

      if (error || data._ownerId !== user._id) {
        return navigate("/");
      }

      setIsFetching(false);
      setModel(data);
      setFields({
        name: data.name,
        description: data.description,
      });
    };

    fetchModel();
  }, [modelId, user._id, navigate]);

  if (isFetching) {
    return "Loading...";
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Typography variant="h4" gutterBottom>
        Edit {model.name}
      </Typography>
      <Box component="form" noValidate width={500} onSubmit={handleSubmit}>
        <FormControl
          fullWidth
          required
          error={errors.name}
          disabled={isUpdating}
        >
          <FormLabel htmlFor={nameId}>Name</FormLabel>
          <OutlinedInput
            id={nameId}
            name="name"
            value={fields.name}
            onChange={handleChange("name")}
          />
        </FormControl>
        <FormControl
          fullWidth
          required
          margin="normal"
          error={errors.description}
          disabled={isUpdating}
        >
          <FormLabel htmlFor={descriptionId}>Description</FormLabel>
          <OutlinedInput
            multiline
            minRows={5}
            maxRows={10}
            id={descriptionId}
            name="description"
            value={fields.description}
            onChange={handleChange("description")}
          />
        </FormControl>
        <Alert variant="outlined" severity="info" sx={{ mt: 1 }}>
          You can only change the name and the description of a model.
          <br />
          If you want to change the model file or the image, you need to create
          a new model.
        </Alert>
        <LoadingButton
          fullWidth
          type="submit"
          size="large"
          variant="contained"
          loading={isUpdating}
          sx={{
            mt: 1,
          }}
        >
          Update
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default EditModelPage;
