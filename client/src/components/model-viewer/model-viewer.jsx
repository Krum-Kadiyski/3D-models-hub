import { useState } from 'react';
import { StlViewer } from 'react-stl-viewer';
import { Spinner } from '../spinner';
import { Box } from '@mui/material';

const style = {
  width: '100%',
  height: '100%',
};

const ModelViewer = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleFinishLoading = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Spinner />
        </Box>
      )}
      <StlViewer
        orbitControls
        shadows
        url={url}
        style={style}
        modelProps={{ scale: 1.5 }}
        onFinishLoading={handleFinishLoading}
      />
    </>
  );
};

export default ModelViewer;
