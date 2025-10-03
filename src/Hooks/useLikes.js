import { useEffect, useState } from "react";
import { addLike, fetchLikes, removeLike } from "../Service/apiLikes";

export function useLikes(whisperId, userId) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function loadLikes() {
      const { count, liked } = await fetchLikes(whisperId, userId);
      setLiked(liked);
      setCount(count);
    }
    if (whisperId && userId) loadLikes();
  }, [whisperId, userId]);

  async function toggleLike() {
    if (liked) {
      await removeLike(whisperId, userId);
      setLiked(false);
      setCount((c) => c - 1);
    } else {
      await addLike(whisperId, userId);
      setLiked(true);
      setCount((c) => c + 1);
    }
  }

  return { liked, count, toggleLike };
}
