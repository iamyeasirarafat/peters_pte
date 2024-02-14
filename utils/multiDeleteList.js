import axios from "axios";

export const multiDeleteList = async (type, list, incDec, action) => {
  try {
    const res = incDec
      ? await axios.put(`/${type}/${action}/${incDec}`, {
          ids: list,
        })
      : await axios.delete(`/${type}/delete_many`, {
          data: {
            ids: list,
          },
        });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
