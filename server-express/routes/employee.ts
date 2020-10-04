import express from "express";
import bodyParser from "body-parser";

const router = express.Router();
// const urlencodeParser = bodyParser.urlencoded({ extended: false });

/* GET users listing. */
router.get("/getEmployee", function (req, res) {
  res.json({
    flag: 0,
    data: [
      {
        id: 1,
        key: 1,
        name: "地域一郎",
        department: "技術部",
        departmentId: 1,
        level: "level-3",
        levelId: 3,
        hiredate: "2019-07-01",
      },
      {
        id: 2,
        key: 2,
        name: "地域三郎",
        department: "サポート事業部",
        departmentId: 2,
        level: "level-2",
        levelId: 2,
        hiredate: "2017-07-01",
      },
      {
        id: 3,
        key: 3,
        name: "Lin",
        department: "技術部",
        departmentId: 2,
        level: "level-2",
        levelId: 2,
        hiredate: "2017-07-01",
      },
    ],
    msg: "OK",
  });
});

export default router;
