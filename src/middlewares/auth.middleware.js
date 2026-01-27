// jwt related
import jwt from "jsonwebtoken";

export const authUser = function (req, res, next) {
  // authenticates user //

  try {
    // the `tokenHeader` will contain(syntax) -> Bearer <JWT_TOKEN>
    const tokenHeader = req.headers["authorization"];

    if (!tokenHeader) {
      // if the token is empty/falsy + the user might not be tring to auth
      return next();
    }

    if (!tokenHeader.startsWith("Bearer")) {
      // if the token header value does not start with the word `Bearer` + user might be tring to auth
      return res
        .status(400)
        .json({ error: `authentication header does not start with "Bearer"` });
    }

    // the `tokenHeader` will be split -> Bearer--split--<JWT_TOKEN> + extraction of only the token
    const token = tokenHeader.split(" ")[1];

    // decode the JWT token to get user's info
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    next();
  }
};

export const ensureUserIsAuth = function (req, res, next) {
  // checks if user is authenticated or not //

  if (!req.user) {
    return res
      .status(401)
      .json({ error: `not authenticated: user not verified` });
  }
  next();
};
