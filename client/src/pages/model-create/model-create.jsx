import { useId, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useUser } from "../../hooks";
import { Upload } from "../../components/upload";
import { uploadFile } from "../../api/supabase";
import { enqueueSnackbar } from "notistack";
import { restService } from "../../helpers";

const initialErrors = {
  name: false,
  description: false,
  file: false,
  image: false,
};

const CreateModelPage = () => {
  const [fields, setFields] = useState({
    name: "",
    description: "",
  });

  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(initialErrors);

  const { isLoggedIn, user } = useUser();
  const navigate = useNavigate();
  const nameId = useId();
  const descriptionId = useId();

  const handleChange = (name) => (event) => {
    setFields((prevState) => ({
      ...prevState,
      [name]: event.target.value,
    }));
  };

  const handleFileChange = ([file]) => {
    setFile(file);
  };

  const handleImageChange = ([image]) => {
    setImage(image);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, description } = fields;

    if (
      !name ||
      name.length > 30 ||
      !description ||
      description.length > 500 ||
      !file ||
      !image
    ) {
      setErrors({
        name: !name || name.length > 30,
        description: !description || description.length > 500,
        file: !file,
        image: !image,
      });

      return;
    }

    setErrors(initialErrors);
    setIsLoading(true);

    const [modelUploadResponse, imageUploadResponse] = await Promise.allSettled(
      [
        uploadFile({
          file,
          type: "model",
          username: user.username,
        }),
        uploadFile({
          file: image,
          type: "image",
          username: user.username,
        }),
      ]
    );

    if (
      modelUploadResponse.status === "rejected" ||
      modelUploadResponse.value?.error
    ) {
      enqueueSnackbar(
        modelUploadResponse.value?.error?.message ?? modelUploadResponse.reason,
        {
          variant: "error",
        }
      );

      setIsLoading(false);

      return;
    }

    if (
      imageUploadResponse.status === "rejected" ||
      imageUploadResponse.value?.error
    ) {
      enqueueSnackbar(
        imageUploadResponse.value?.error?.message ?? imageUploadResponse.reason,
        {
          variant: "error",
        }
      );

      setIsLoading(false);

      return;
    }

    const { data, error } = await restService.post("/data/models", {
      name,
      description,
      file: `${
        import.meta.env.VITE_SUPABASE_PROJECT_URL
      }/storage/v1/object/public/${modelUploadResponse.value.data.fullPath}`,
      image: `${
        import.meta.env.VITE_SUPABASE_PROJECT_URL
      }/storage/v1/object/public/${imageUploadResponse.value.data.fullPath}`,
    });

    setIsLoading(false);

    if (!error) {
      navigate(`/models/${data._id}`);
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Typography variant="h4" gutterBottom>
        Create a model
      </Typography>
      <Box component="form" noValidate width={500} onSubmit={handleSubmit}>
        <FormControl
          fullWidth
          required
          error={errors.name}
          disabled={isLoading}
        >
          <FormLabel htmlFor={nameId}>Name</FormLabel>
          <OutlinedInput
            id={nameId}
            name="name"
            value={fields.name}
            onChange={handleChange("name")}
          />
          <FormHelperText>
            The name can not be more than 30 characters
          </FormHelperText>
        </FormControl>
        <FormControl
          fullWidth
          required
          margin="normal"
          error={errors.description}
          disabled={isLoading}
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
          <FormHelperText>
            The description can not be more than 500 characters
          </FormHelperText>
        </FormControl>
        <FormControl
          fullWidth
          required
          margin="normal"
          error={errors.file}
          disabled={isLoading}
        >
          <Upload
            label="Model file"
            description="Drag and drop or click to select the model file."
            helperText="Only .stl files are accepted."
            onAccept={handleFileChange}
            accept={{
              "application/sla": [".stl"],
            }}
          />
        </FormControl>
        <FormControl
          fullWidth
          required
          margin="normal"
          error={errors.image}
          disabled={isLoading}
        >
          <Upload
            label="Model image"
            description="Drag and drop or click to select the model image."
            helperText="Only .png, .jpg or .jpeg files are accepted."
            accept={{
              "image/png": [".png"],
              "image/jpeg": [".jpg", ".jpeg"],
            }}
            onAccept={handleImageChange}
          />
        </FormControl>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
          sx={{
            mt: 1,
          }}
        >
          Create
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default CreateModelPage;
