import db from "../models";
const getGroupWithRoles = async (user) => {
  try {
    console.log("4", user);
    const roles = await db.Group.findOne({
      where: { id: user.GroupId },
      attributes: ["id", "name", "description"],
      include: {
        model: db.Role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] },
      },
    });

    console.log("finalllllllllllllllllllllllllllllllll ", roles);
    return roles;
  } catch (err) {
    console.log("err", err);
  }
};
export { getGroupWithRoles };
