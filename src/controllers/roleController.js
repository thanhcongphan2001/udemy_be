import {
  createNewRoles,
  getAllRoles,
  deleteRole,
  getRoleByGroupser,
  assignRoleToGroupSer,
} from "../services/roleApiServices";
const readFunc = async (req, res) => {
  console.log("dddddddddddddddddddddddddddddddddddddddddddddddd");
  try {
    let data = await getAllRoles();
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

const createFunc = async (req, res) => {
  try {
    let data = await createNewRoles(req.body);
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

const deleteFunc = async (req, res) => {
  console.log(req.body.id);
  try {
    let data = await deleteRole(req.body.id);
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
const getRoleByGroup = async (req, res) => {
  try {
    let id = req.params.groupid;
    let data = await getRoleByGroupser(id);
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
const assignRoleToGroup = async (req, res) => {
  try {
    let data = await assignRoleToGroupSer(req.body.data);
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
export { readFunc, deleteFunc, createFunc, getRoleByGroup, assignRoleToGroup };
