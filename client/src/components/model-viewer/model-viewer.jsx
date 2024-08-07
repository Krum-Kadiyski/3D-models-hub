import { StlViewer } from "react-stl-viewer";

const style = {
  width: "100%",
  height: "100%",
};

const ModelViewer = ({ url }) => (
  <StlViewer
    orbitControls
    shadows
    url={url}
    style={style}
    modelProps={{ scale: 1.5 }}
  />
);

export default ModelViewer;
