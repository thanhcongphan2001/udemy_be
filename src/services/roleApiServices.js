import db from "../models";
const createNewRoles = async (roles) => {
  try {
    const currentRoles = await db.Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });
    console.log("8", currentRoles);
    console.log("9", roles);
    const persists = roles.filter(
      ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2)
    );
    console.log("persists", persists);
    if (persists.length === 0) {
      return {
        EM: "notthing to create",
        EC: 0,
        DT: [],
      };
    }
    await db.Role.bulkCreate(persists);
    return {
      EM: `create role succeeds : ${persists.length} roles `,
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log("errrservice", error);
  }
};
const getAllRoles = async () => {
  try {
    let data = await db.Role.findAll({
      order: [["id", "DESC"]],
    });
    return {
      EM: "Get all roles succeeds",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log("errrservice", error);
  }
};
const deleteRole = async (id) => {
  try {
    // let role = await db.Role.findOne({
    //   where: { id: id },
    // });
    // if (role) {
    //   await role.destroy();
    // }
    await db.Role.destroy({
      where: { id: id },
    });
    console.log("ddddddddddddđ");
    return {
      EM: "Delete roles success",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log("errrservice", error);
  }
};
const getRoleByGroupser = async (id) => {
  try {
    if (!id) {
      return {
        EM: "not found any roles",
        EC: 0,
        DT: [],
      };
    }
    let roles = await db.Group.findOne({
      where: { id: id },
      attributes: ["id", "name", "description"],
      include: {
        model: db.Role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] },
      },
    });
    console.log(roles?.get({ plain: true }));
    return {
      EM: "get roles by group success",
      EC: 0,
      DT: roles,
    };
  } catch (error) {
    console.log("errrservice", error);
  }
};
const assignRoleToGroupSer = async (data) => {
  try {
    console.log("96", data.groupRoles);
    await db.GroupRole.destroy({
      where: { Groupid: data.groupId },
    });
    await db.GroupRole.bulkCreate(data.groupRoles);

    return {
      EM: "Assign Role to Group succeed ",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log("errrservice", error);
  }
};
export {
  createNewRoles,
  getAllRoles,
  deleteRole,
  getRoleByGroupser,
  assignRoleToGroupSer,
};
