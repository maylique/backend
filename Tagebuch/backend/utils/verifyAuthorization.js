import jwt from "jsonwebtoken";

export const verifyAuthorization = (authHeader) => {
  if (typeof authHeader === "undefined") {
    return { status: "error" };
  }

  const [authType, token] = authHeader.split(" ");
  if (authType !== "Bearer") {
    return { status: "error" };
  }

  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    return { status: "ok", user: result };
  } catch (err) {
    return { status: "error" };
  }
};
