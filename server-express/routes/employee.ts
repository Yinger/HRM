import express from "express";
import bodyParser from "body-parser";
import excelExport from "excel-export";
import { resolve } from "bluebird";
import { QueryTypes, UpdateOptions, DestroyOptions } from "sequelize";
import dbConfig from "../config/db";
import Department from "../models/Department";
import Level from "../models/Level";
import Employee from "../models/Employee";

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

let queryAllSQL = `SELECT employee.*, level.level, department.department
    FROM employee, level, department
    WHERE
        employee.levelId = level.id AND
        employee.departmentId = department.id`;

/* GET users listing. */
router.get("/getDepartment", function (req, res) {
  Department.findAll<Department>({})
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
  let { name = "", departmentId } = req.query;
  let conditions = `AND employee.name LIKE '%${name}%'`;
  if (departmentId) {
    conditions = conditions + ` AND employee.departmentId=${departmentId}`;
  }
  let sql = `${queryAllSQL} ${conditions} ORDER BY employee.id DESC`;
  const employees = await dbConfig.query(sql, {
    raw: true,
    type: QueryTypes.SELECT,
  });

  resolve(
    res.json({
      flag: 0,
      data: employees,
      msg: "OK",
      // total: total,
    })
  );
});

router.post("/createEmployee", urlencodedParser, async function (req, res) {
  let { name, departmentId, hiredate, levelId } = req.body;
  // let sql = `${queryAllSQL} ORDER BY employee.id DESC`;
  Employee.create({
    name: name,
    hiredate: new Date(hiredate),
    departmentId: departmentId,
    levelId: levelId,
  }).then(async (result) => {
    resolve(
      res.json({
        flag: 0,
        data: { key: result.id, id: result.id },
        msg: "OK",
      })
    );
  });
});
router.post("/updateEmployee", urlencodedParser, async function (req, res) {
  let { id, name, departmentId, hiredate, levelId } = req.body;
  const options: UpdateOptions = {
    where: { id: id },
    limit: 1,
  };
  Employee.update(
    {
      name: name,
      departmentId: departmentId,
      hiredate: new Date(hiredate),
      levelId: levelId,
    },
    options
  ).then(() => {
    resolve(
      res.json({
        flag: 0,
        msg: "OK",
      })
    );
  });
});

router.post("/deleteEmployee", async (req, res) => {
  let { id } = req.body;
  try {
    const options: DestroyOptions = {
      where: { id: id },
      limit: 1,
    };
    Employee.destroy(options).then(() => {
      res.json({
        flag: 0,
      });
    });
  } catch (e) {
    res.json({
      flag: 1,
      msg: e.toString(),
    });
  }
});

let conf: excelExport.Config = {
  cols: [
    { caption: "ID", type: "number" },
    { caption: "氏名", type: "string" },
    { caption: "所属課", type: "string" },
    { caption: "入社年月日", type: "string" },
    { caption: "Level", type: "string" },
  ],
  rows: [],
};

router.get("/downloadEmployee", async (req, res) => {
  try {
    let sql = `${queryAllSQL} ORDER BY employee.id DESC`;
    let result = await dbConfig.query(sql, {
      raw: true,
      type: QueryTypes.SELECT,
    });
    conf.rows = result.map((i: any) => {
      return [i.id, i.name, i.department, i.hiredate, i.level];
    });
    let excel = excelExport.execute(conf);
    res.setHeader("Content-Type", "application/vnd.openxmlformats");
    res.setHeader("Content-Disposition", "attachment; filename=Employee.xlsx");
    res.end(excel, "binary");
  } catch (e) {
    res.send(e.toString());
  }
});

export default router;
