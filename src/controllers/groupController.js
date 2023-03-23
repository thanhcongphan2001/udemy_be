import { getGroups } from "../services/groupServices";

const getGroup = async (req, res) => {
  try {
    let data = await getGroups();

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
export { getGroup };
