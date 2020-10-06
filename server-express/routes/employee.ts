import express from "express";
// import bodyParser from "body-parser";
import Department from "../models/Department";
import Level from "../models/Level";
import Employee from "../models/Employee";
import { resolve } from "bluebird";

const router = express.Router();
// const urlencodeParser = bodyParser.urlencoded({ extended: false });

/* GET users listing. */
router.get("/getDepartment", function (req, res) {
  Department.findAll<Department>({
    // attributes: ["id", "department"],
  })
    .then((departments: Array<Department>) => {
      console.log(departments);
      resolve(
        res.json({
          flag: 0,
          data: departments,
          msg: "OK",
        })
      );
    })
    .catch((err: Error) => {
      res.json({
        flag: 1,
        data: [],
        msg: err.message,
      });
    });
});
router.get("/getLevel", function (req, res) {
  Level.findAll<Level>({})
    .then((levels: Array<Level>) => {
      resolve(
        res.json({
          flag: 0,
          data: levels,
          msg: "OK",
        })
      );
    })
    .catch((err: Error) => {
      res.json({
        flag: 1,
        data: [],
        msg: err.message,
      });
    });
});
router.get("/getEmployee", function (req, res) {
  Employee.findAll<Employee>({}).then((employees: Array<Employee>) => {
    //todo
  });
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
