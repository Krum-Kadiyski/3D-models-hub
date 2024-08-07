import { useId, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { FormLabel, FormHelperText, Box, Typography } from '@mui/material';

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  alignItems: 'center',
  padding: 20,
  borderRadius: 2,
  borderWidth: 2,
  borderStyle: 'dashed',
  borderColor: '#eee',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border 240ms ease-in-out',
};

const focusedStyle = {
  backgroundColor: '#2196f3',
  color: 'white',
};

const acceptStyle = {
  backgroundColor: '#f1f8e9',
};

const Upload = ({ label, description, helperText, accept, onAccept }) => {
  const id = useId();
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    acceptedFiles,
  } = useDropzone({
    accept,
    maxFiles: 1,
    onDropAccepted: onAccept,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused && focusedStyle),
      ...(isDragAccept && acceptStyle),
    }),
    [isFocused, isDragAccept]
  );

  const fileName = acceptedFiles[0]?.name;

  return (
    <>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Box {...getRootProps({ style })}>
        <input {...getInputProps({ id })} />
        <Typography>{fileName ?? description}</Typography>
      </Box>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </>
  );
};
export default Upload;
