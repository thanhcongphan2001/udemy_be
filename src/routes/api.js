const express = require("express");
import db from "../models";
const router = express.Router();
import { getGroup } from "../controllers/groupController";
import { checkUserJwt, checkUserPermission } from "../middleware/JWTAction";
import {
  handleRegister,
  handleLogin,
  getAllUser,
  postUser,
  updateUser,
  deleteUser,
  getUserAccount,
  handleLogOut,
} from "../controllers/apiController";
import {
  createFunc,
  readFunc,
  deleteFunc,
  getRoleByGroup,
  assignRoleToGroup,
} from "../controllers/roleController";

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/logout", handleLogOut);
router.get("/account", checkUserJwt, checkUserPermission, getUserAccount);
//user routes
router.get("/allUsers", checkUserJwt, checkUserPermission, getAllUser);
router.post("/createUser", postUser);
router.put("/updateUser", checkUserJwt, checkUserPermission, updateUser);
router.delete("/deleteUser", checkUserJwt, checkUserPermission, deleteUser);
//roles router
router.get("/allRoles", checkUserJwt, checkUserPermission, readFunc);
router.post("/createRole", checkUserJwt, checkUserPermission, createFunc);
// router.put("/updateRole", roleController.updateFunc);
router.delete("/deleteRole", checkUserJwt, checkUserPermission, deleteFunc);
router.get(
  "/role/by-group/:groupid",
  checkUserJwt,
  checkUserPermission,
  getRoleByGroup
);
router.post(
  "/role/assign-to-group",
  checkUserJwt,
  checkUserPermission,
  assignRoleToGroup
);
//group route
router.get("/group/read", checkUserJwt, checkUserPermission, getGroup);

module.exports = router;
