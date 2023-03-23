require("dotenv").config();
import jwt from "jsonwebtoken";

const nonSecurePaths = ["/logout", "/login", "/register"];
const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = "null";
  try {
    token = jwt.sign(payload, key, {
      expiresIn: process.env.JWT_EXPRIES_IN,
    });
  } catch (error) {
    console.log(error);
  }

  return token;
};
const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (error) {
    console.log(error);
  }

  return decoded;
};

const checkUserJwt = (req, res, next) => {
  console.log("checkUserJwt");

  if (nonSecurePaths.includes(req.path)) {
    console.log("checkUserJwtpathhhh");
    return next();
  }
  let cookie = req.cookies;

  if (cookie && cookie.jwt) {
    let token = cookie.jwt;
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      req.token = token;

      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "not authenticated the user",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "not authenticated the user",
    });
  }
};
const checkUserPermission = (req, res, next) => {
  console.log("checkUserPermission");
  if (nonSecurePaths.includes(req.path) || req.path == "/account") {
    console.log("checkUserPermissionnnnnnnnnnnnnnnn");
    return next();
  }
  if (req.user) {
    let email = req.user.email;
    let roles = req.user.groupWithRoles.Roles;
    let currentUrl = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "you dont permission to access this resource",
      });
    }
    let canAccess = roles.some(
      (item) => item.url === currentUrl || currentUrl.includes(item.url)
    );
    if (canAccess === true) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "you dont permission to access this resource",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "not authenticated the user",
    });
  }
};

export { createJWT, verifyToken, checkUserJwt, checkUserPermission };
