import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { Button, ButtonGroup } from "@mui/material";
import FileDownloadSharpIcon from "@mui/icons-material/FileDownloadSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { useConfirm } from "material-ui-confirm";
import { useUser } from "../../hooks";
import { formatQueryParams, restService } from "../../helpers";
import { deleteFiles } from "../../api/supabase";

const ActionButtons = ({ model }) => {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { user } = useUser();

  const isOwner = model._ownerId === user._id;

  const handleEdit = () => {
    navigate(`/models/${model._id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await confirm({
        title: "Delete model",
        description: "Are you sure you want to delete this model?",
        confirmationText: "Delete",
        cancellationText: "Cancel",
      });

      const { error } = await restService.delete(`/data/models/${model._id}`);

      if (!error) {
        const getRatingsParams = new URLSearchParams({
          where: `modelId="${model._id}"`,
        });

        const { data: allRatings, error: ratingsFetchError } =
          await restService.get(
            `/data/ratings?${formatQueryParams(getRatingsParams)}`
          );

        if (!ratingsFetchError) {
          await Promise.allSettled(
            allRatings.map((rating) =>
              restService.delete(`/data/ratings/${rating._id}`, {
                headers: {
                  "X-Admin": true,
                },
              })
            )
          );
        }

        await deleteFiles([
          { type: "model", url: model.file },
          { type: "image", url: model.image },
        ]);

        enqueueSnackbar("Successfully deleted", {
          variant: "success",
        });

        navigate("/");
      }
    } catch {
      /* empty */
    }
  };

  return (
    <>
      <Button
        variant="contained"
        component={Link}
        to={model.file}
        download={model.name}
        startIcon={<FileDownloadSharpIcon />}
        sx={{ mt: 2, mb: 2 }}
      >
        Download
      </Button>
      {isOwner && (
        <ButtonGroup orientation="vertical">
          <Button
            color="primary"
            onClick={handleEdit}
            startIcon={<EditSharpIcon />}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            startIcon={<DeleteSharpIcon />}
          >
            Delete
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};

export default ActionButtons;
