import axios from "axios";

export const multiDeleteList = async (type, list) => {
  try {
    const res = await axios.delete(`/${type}/delete_many`, {
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
