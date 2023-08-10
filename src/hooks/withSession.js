const withSession = async ({ token, refreshToken }) => {
  if (token) {
    try {
      const res = await fetch(`http://3.110.151.3:7000/auth/token/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });
      const data = await res.json();
      console.log(data, "data");
      if (data?.code === "token_not_valid") return [false, true];
      return [true, false];
    } catch (error) {
      console.log("error", error);
      return [false, error];
    }
  }

  if (refreshToken) {
    try {
      const res = await fetch(`http://3.110.151.3:7000/auth/token/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      });
      const data = await res.json();
      return [data.access, false];
    } catch (error) {
      return [null, error];
    }
  }
  return [null, null];
};
export default withSession;
