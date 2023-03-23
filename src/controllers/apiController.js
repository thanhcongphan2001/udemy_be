import { registerNewUser, LoginUser } from "../services/loginRegisterServicses";
import {
  all_user,
  create_user,
  update_user,
  deleUser,
  all_user_paginate,
} from "../services/crudUsers.js";
const handleRegister = async (req, res) => {
  try {
    if (!req.body.Email || !req.body.Phone || !req.body.Password) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "1",
        DT: "",
      });
    }

    if (req.body.Password && req.body.Password.length < 4) {
      return res.status(200).json({
        EM: "Your password must have more than 3 letters",
        EC: "1",
        DT: "",
      });
    }
    const data = await registerNewUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error server",
      EC: "-1",
      DT: "",
    });
  }
};
const handleLogin = async (req, res) => {
  console.log("loginnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
  try {
    console.log(req.body);
    if (!req.body.islogin || !req.body.Password) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "1",
        DT: "",
      });
    }

    const data = await LoginUser(req.body);
    if (data && data.DT && data.DT.access_token) {
      res.cookie("jwt", data.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error server",
      EC: "-1",
      DT: "",
    });
  }
};
const getAllUser = async (req, res) => {
  console.log("allllllllllllllllllllllllllllll");
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      const data = await all_user_paginate(+page, +limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else {
      const data = await all_user();
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
      c;
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error server",
      EC: "-1",
      DT: "",
    });
  }
};

const postUser = async (req, res) => {
  try {
    console.log(req.body);
    let data = await create_user(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error server",
      EC: "-1",
      DT: "",
    });
  }
};
const updateUser = async (req, res) => {
  try {
    console.log(req.body);
    let data = await update_user(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error server",
      EC: "-1",
      DT: "",
    });
  }
};
const deleteUser = async (req, res) => {
  console.log("deleteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  try {
    console.log(req.body);
    let data = await deleUser(req.body.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error server",
      EC: "-1",
      DT: "",
    });
  }
};
const getUserAccount = async (req, res) => {
  console.log("15777777", req.user);
  return res.status(200).json({
    EM: "ok",
    EC: 0,
    DT: {
      access_token: req.token,
      groupWithRoles: req.user.groupWithRoles,
      email: req.user.email,
    },
  });
};
const handleLogOut = async (req, res) => {
  try {
    res.clearCookie("jwt");

    return res.status(200).json({
      EM: "clear cookie",
      EC: 0,
      DT: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error server",
      EC: "-1",
      DT: "",
    });
  }
};
export {
  handleRegister,
  handleLogin,
  getAllUser,
  postUser,
  updateUser,
  deleteUser,
  getUserAccount,
  handleLogOut,
};
