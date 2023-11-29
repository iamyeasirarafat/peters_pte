const checkRole = async (token) => {
  if (token) {
    console.log(token, "checkrole");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/role`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await res.json();
      console.log(data, "data role");
      //   if (data?.code === "token_not_valid") return [false, true];
      return data.role;
    } catch (error) {
      return false;
    }
  }
};
export default checkRole;
