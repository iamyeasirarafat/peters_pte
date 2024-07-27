const withSession = async ({ token, refreshToken }) => {
  if (token) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/token/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
        }
      );
      const data = await res.json();
      if (data?.code === "token_not_valid") return [false, true];
      return [true, false];
    } catch (error) {
      console.log("error", error);
      return [false, error];
    }
  }

  if (refreshToken) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/token/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: refreshToken,
          }),
        }
      );
      const data = await res.json();
      return [data.access, false];
    } catch (error) {
      return [null, true];
    }
  }
  return [false, true];
};
export default withSession;
