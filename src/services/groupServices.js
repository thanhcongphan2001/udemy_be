import db from "../models";
const getGroups = async () => {
  try {
    const data = await db.Group.findAll({
      order: [["name", "ASC"]],
    });

    return {
      EM: "get group succes",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log("errrservice", error);
  }
};
export { getGroups };
