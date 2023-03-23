const express = require("express");
import db from "../models";
const router = express.Router();
// const {
//   getcong,
//   create_user,
//   get_update,
//   edituser,
//   delete_user,
// } = require("../controllers/homeController");
// router.get("/", getcong);

// router.get("/update/:id", get_update);
// router.post("/create_user", create_user);
// router.post("/edit_user", edituser);

// router.post("/delete/:id", delete_user);
router.get("/create", (req, res) => {
  const cong = async () => {
    try {
      const final = await db.User.findOne({
        where: { id: 1 },
        include: { model: db.Group },
        raw: true,
        nest: true,
      });
      console.log("final ", final);
    } catch (err) {
      console.log("err", err);
    }
  };
  cong();
  console.log("db.user", db);
  res.render("cong.ejs");
});
router.get("/test", (req, res) => {
  // console.log("call me", req.body);
  // setTimeout(() => res.status(200).json(req.body), 1000);
  const cong = async () => {
    try {
      const final = await db.Role.findAll({
        include: { model: db.Group, where: { id: 1 } },
        raw: true,
        nest: true,
      });
      console.log("final ", final);
    } catch (err) {
      console.log("err", err);
    }
  };
  cong();
});
module.exports = router;
