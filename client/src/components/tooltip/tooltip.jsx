import { Tooltip as MuiTooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

const Tooltip = styled(({ className, ...props }) => (
  <MuiTooltip
    {...props}
    disableInteractive
    enterTouchDelay={0}
    placement="top"
    classes={{ popper: className }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 415,
    fontSize: theme.typography.pxToRem(16),
    padding: "8px 16px",
    border: "1px solid #dadde9",
  },
}));

export default Tooltip;
