import { useId } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import ArrowUpwardSharpIcon from "@mui/icons-material/ArrowUpwardSharp";
import ArrowDownwardSharpIcon from "@mui/icons-material/ArrowDownwardSharp";

const Sort = () => {
  const id = useId();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = {
    sortBy: searchParams.get("sortBy") || "_createdOn",
    order: searchParams.get("order"),
  };

  const handleSortFieldChange = (event) => {
    searchParams.set("sortBy", event.target.value);

    setSearchParams(searchParams);
  };

  const handleSortOrderChange = () => {
    searchParams.set("order", sort.order === "desc" ? "" : "desc");

    setSearchParams(searchParams);
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id={id}>Sort By</InputLabel>
        <Select
          labelId={id}
          value={sort.sortBy}
          label="Sort By"
          onChange={handleSortFieldChange}
        >
          <MenuItem value="_createdOn">Date</MenuItem>
          <MenuItem value="name">Name</MenuItem>
        </Select>
      </FormControl>
      <Tooltip title="Sort order" placement="top">
        <IconButton size="large" onClick={handleSortOrderChange} sx={{ mr: 1 }}>
          {sort.order === "desc" ? (
            <ArrowDownwardSharpIcon />
          ) : (
            <ArrowUpwardSharpIcon />
          )}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default Sort;
