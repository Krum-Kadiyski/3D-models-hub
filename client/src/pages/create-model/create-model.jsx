import { useId, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Box, FormControl, FormLabel, OutlinedInput } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useUser } from '../../hooks/use-user';
import { Upload } from '../../components/upload';
import { uploadFile } from '../../api/supabase';
import { enqueueSnackbar } from 'notistack';

const initialErrors = {
  name: false,
  description: false,
  modelFile: false,
  modelImage: false,
};

const CreateModel = () => {
  const [modelFile, setModelFile] = useState();
  const [modelImage, setModelImage] = useState();
  const [errors, setErrors] = useState(initialErrors);
  const [isLoading, setIsLoading] = useState(false);

  const { isLoggedIn, user } = useUser();
  const navigate = useNavigate()
  const nameId = useId();
  const descriptionId = useId();

  const handleModelFileChange = ([file]) => {
    setModelFile(file);
  };

  const handleModelImageChange = ([image]) => {
    setModelImage(image);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const description = formData.get('description');
    console.log(modelImage);

    if (!name || !description || !modelFile || !modelImage) {
      setErrors({
        name: !name,
        description: !description,
        modelFile: !modelFile,
        modelImage: !modelImage,
      });

      return;
    }

    console.log({ name, description, modelFile, modelImage });
    setErrors(initialErrors);
    setIsLoading(true);

    const { data: modelFileData, error: modelFileError } = await uploadFile({
      username: user.username,
      file: modelFile,
      type: 'model',
    });

    const { data: modelImageData, error: modelImageError } = await uploadFile({
      username: user.username,
      file: modelImage,
      type: 'image',
    });

    if (modelFileError || modelImageError) {
      enqueueSnackbar(modelFileError.message ?? modelImageError.message, {
        variant: 'error',
      });
    } else {
      
    }

    setIsLoading(false);
    
    // navigate('/some')
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <Box display="flex" justifyContent="center" mt={1}>
      <Box component="form" noValidate width={500} onSubmit={handleSubmit}>
        <FormControl
          fullWidth
          required
          margin="normal"
          error={errors.name}
          disabled={isLoading}
        >
          <FormLabel htmlFor={nameId}>Name</FormLabel>
          <OutlinedInput id={nameId} name="name" />
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
          />
        </FormControl>
        <FormControl
          fullWidth
          required
          margin="normal"
          error={errors.modelFile}
          disabled={isLoading}
        >
          <Upload
            label="Model file"
            description="Drag and drop or click to select the model file."
            helperText="Only .stl files are accepted."
            onAccept={handleModelFileChange}

            // accept={{
            //   'model/*': ['.stl'],
            //   'application/*': ['.stl'],
            // }}
          />
        </FormControl>
        <FormControl
          fullWidth
          required
          margin="normal"
          error={errors.modelImage}
          disabled={isLoading}
        >
          <Upload
            label="Model image"
            description="Drag and drop or click to select the model image."
            helperText="Only .png, .jpg or .jpeg files are accepted."
            accept={{
              'image/*': ['.png', '.jpg', 'jpeg'],
            }}
            onAccept={handleModelImageChange}
          />
        </FormControl>
        <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          loading={isLoading}
          sx={{
            mb: 1,
          }}
        >
          Create
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default CreateModel;
