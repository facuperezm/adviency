import { ApiError } from "next/dist/server/api-utils/index.js";

export const api = {
  gifts: {
    get: async () => {
      const response = await fetch("/api/gifts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return response.json();
      } else {
        throw new ApiError(response.status, response.statusText);
      }
    },
  },
};
