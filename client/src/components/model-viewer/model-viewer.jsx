import { StlViewer } from 'react-stl-viewer';

const url = 'https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl';

const style = {
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
};

const ModelViewer = () => <StlViewer style={style} orbitControls shadows url={url} />;

export default ModelViewer;
