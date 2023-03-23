import db from "../models";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
require("dotenv").config();
import { getGroupWithRoles } from "./JWTService";
import { createJWT } from "../middleware/JWTAction";
const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });
  if (user) {
    return true;
  } else {
    return false;
  }
};
const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  });
  if (user) {
    return true;
  } else {
    return false;
  }
};
const hashPassword = (userpassword) => {
  let hash = bcrypt.hashSync(userpassword);
  return hash;
};

const checkPassword = (inputpass, hash) => {
  let checkpass = bcrypt.compareSync(inputpass, hash);
  return checkpass;
};
const registerNewUser = async (data) => {
  try {
    let isEmailExist = await checkEmailExist(data.Email);
    let isPhoneExist = await checkPhoneExist(data.Phone);
    // let hashPass =
    if (isEmailExist) {
      return {
        EM: "Email is Exist",
        EC: 1,
      };
    }
    if (isPhoneExist) {
      return {
        EM: "Phone is Exist",
        EC: 1,
      };
    }
    let hash = hashPassword(data.Password);
    await db.User.create({
      email: data.Email,
      phone: data.Phone,
      password: hash,
      username: data.Username,
      groupId: 4,
    });
    return {
      EM: "a user is creacted sucessfully",
      EC: 0,
    };
  } catch (e) {
    console.log("errrservice", e);
  }
};
const LoginUser = async (rawdata) => {
  try {
    const user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawdata.islogin }, { phone: rawdata.islogin }],
      },
    });
    // console.log("1", user);
    // console.log("2", user?.get({ plain: true }));
    if (user) {
      console.log("found user is login");
      if (true === checkPassword(rawdata.Password, user.password)) {
        let groupWithRoles = await getGroupWithRoles(user);
        let payload = {
          email: user.email,
          groupWithRoles,
        };
        let token = createJWT(payload);
        console.log("88888888888", token);
        return {
          EM: "OK login succcesfully",
          EC: 0,
          DT: {
            access_token: token,
            groupWithRoles,
            email: user.email,
          },
        };
      }
    }
    return {
      EM: "your password or phone/email is incorrect",
      EC: 1,
    };
  } catch (error) {
    console.log("errrservice", error);
  }
};
export {
  registerNewUser,
  LoginUser,
  checkEmailExist,
  hashPassword,
  checkPhoneExist,
};
