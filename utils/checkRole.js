const checkRole = async (token) => {
  if (token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/role`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await res.json();
      return data.role;
    } catch (error) {
      return false;
    }
  }
};
export default checkRole;
