import express from "express";
import Department from "../models/Department";
import Level from "../models/Level";
import Employee from "../models/Employee";
import { resolve } from "bluebird";
import { QueryTypes } from "sequelize";
import dbConfig from "../config/db";

const router = express.Router();
let queryAllSQL = `SELECT employee.*, level.level, department.department
    FROM employee, level, department
    WHERE
        employee.levelId = level.id AND
        employee.departmentId = department.id`;

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
router.get("/getEmployee", async function (req, res) {
  // var total = Employee.count();
  let { name = "", departmentId } = req.query;
  let conditions = `AND employee.name LIKE '%${name}%'`;
  if (departmentId) {
    conditions = conditions + ` AND employee.departmentId=${departmentId}`;
  }
  let sql = `${queryAllSQL} ${conditions} ORDER BY employee.id DESC`;
  const employees = await dbConfig.query(sql, {
    // logging: console.log,
    raw: true,
    type: QueryTypes.SELECT,
  });
  // console.log(JSON.stringify(employees));

  resolve(
    res.json({
      flag: 0,
      data: employees,
      msg: "OK",
      // total: total,
    })
  );
});

export default router;
