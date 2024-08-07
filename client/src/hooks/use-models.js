import { useState, useMemo, useEffect } from "react";
import { restService, formatQueryParams } from "../helpers";

export const useModels = (
  { where, sortBy, offset, pageSize = 8 },
  { skipModels = false, skipTotal = false } = {}
) => {
  const [models, setModels] = useState([]);
  const [total, setTotal] = useState(0);
  const [areModelsLoading, setAreModelsLoading] = useState(true);

  const pages = useMemo(() => Math.ceil(total / pageSize), [total, pageSize]);

  useEffect(() => {
    const fetchModels = async () => {
      const params = new URLSearchParams({
        pageSize,
        ...(where && { where }),
        ...(sortBy && { sortBy }),
        ...(offset && { offset }),
      });

      setAreModelsLoading(true);

      const { data, error } = await restService.get(
        `/data/models?${formatQueryParams(params)}`
      );

      if (!error) {
        setModels(data);
      }

      setAreModelsLoading(false);
    };

    if (!skipModels) {
      fetchModels();
    }
  }, [skipModels, pageSize, where, sortBy, offset]);

  useEffect(() => {
    const fetchTotal = async () => {
      const params = new URLSearchParams({
        ...(where && { where }),
      });

      const { data, error } = await restService.get(
        `/data/models?count&${formatQueryParams(params)}`
      );

      if (!error) {
        setTotal(data);
      }
    };

    if (!skipTotal) {
      fetchTotal();
    }
  }, [skipTotal, where]);

  return {
    areModelsLoading,
    models,
    total,
    pages,
  };
};
