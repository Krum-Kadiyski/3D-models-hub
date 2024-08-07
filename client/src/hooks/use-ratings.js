import { useState, useEffect } from "react";
import { restService, formatQueryParams } from "../helpers";

export const useRatings = (modelId, userId) => {
  const [ratings, setRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const averageRating =
    ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;
  const currentUserRating = ratings.find(
    (rating) => rating._ownerId === userId
  );

  const handleRate = async (_event, rating) => {
    const { data, error } = await restService.post("/data/ratings", {
      modelId,
      rating,
    });

    if (!error) {
      setRatings((prevRatings) => [...prevRatings, data]);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchRatings = async () => {
      const params = new URLSearchParams({
        where: `modelId="${modelId}"`,
        pageSize: 9999999,
      });

      const { data, error } = await restService.get(
        `/data/ratings?${formatQueryParams(params)}`
      );

      if (!error) {
        setRatings(data);
      }

      setIsLoading(false);
    };

    if (modelId) {
      fetchRatings();
    }
  }, [modelId]);

  return { isLoading, averageRating, currentUserRating, handleRate };
};
