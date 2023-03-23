import db from "../models";
import {
  hashPassword,
  checkEmailExist,
  checkPhoneExist,
} from "./loginRegisterServicses";
const all_user = async () => {
  try {
    const user = await db.User.findAll({
      attributes: ["id", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
      raw: true,
      nest: true,
    });

    if (user) {
      console.log(">>>>>", user);
      return {
        EM: "OK succcesfully",
        EC: 0,
        DT: user,
      };
    } else {
      return {
        EM: "something wrong",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log("errrservice", error);
  }
};
const all_user_paginate = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["name", "description", "id"] },
      order: [["id", "DESC"]],
    });
    let totalpage = Math.ceil(count / limit);
    let data = {
      totalRow: count,
      totalPages: totalpage,
      users: rows,
    };
    return {
      EM: "ok",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrong",
      EC: 0,
      DT: [],
    };
  }
};
const create_user = async (data) => {
  try {
    let isEmailExist = await checkEmailExist(data.email);
    let isPhoneExist = await checkPhoneExist(data.phone);

    if (isEmailExist) {
      return {
        EM: "Email is Exist",
        EC: 1,
        DT: "email",
      };
    }
    if (isPhoneExist) {
      return {
        EM: "Phone is Exist",
        EC: 1,
        DT: "phone",
      };
    }
    let hash = hashPassword(data.password);
    await db.User.create({ ...data, password: hash });
    return {
      EM: "ok",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
  }
};
const update_user = async (data) => {
  try {
    if (!data.groupId) {
      return {
        EM: "error with empty groupid",
        EC: 2,
        DT: [],
      };
    }
    const user = await db.User.findOne({
      where: {
        id: data.id,
      },
    });
    if (user) {
      await user.update({
        address: data.address,
        sex: data.sex,
        groupId: data.groupId,
      });
      return {
        EM: "update user succed",
        EC: 0,
        DT: "",
      };
    }
  } catch (error) {
    console.log("errrservice", error);
  }
};
const deleUser = async (id) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      await user.destroy();
      return {
        EM: "delete succesfully",
        EC: 0,
      };
    } else {
      return {
        EM: "delete exits",
        EC: 2,
      };
    }
  } catch (error) {
    console.log("errrservice", error);
  }
};
export { all_user, create_user, update_user, deleUser, all_user_paginate };
