import e = require("express");
import IBaseController = require("../interfaces/base/base-controller");
import UserBusiness = require("../../app/business/user-business");
import IUserModel = require("../../app/model/interfaces/i-user-model");
import * as winston from "winston";
import UserController = require("./user-controller");
import jwt = require("jsonwebtoken");
import { getServerConfigs } from "../../config/env/index";
import Container = require("../../container");

class AuthController extends UserController {

  token(req : e.Request, res : e.Response, next : e.NextFunction) : void {
    try {
      let email : string             = req.params.email;
      let candidatePassword : string = req.params.password;
      let userBusiness               = new UserBusiness();
      let expression                 = {
        email: { email }
      };

      userBusiness.findOne(expression, (error: any, user: IUserModel) => {
        if (error) {
          next({ status: 400, "error": error });
        }

        if (user) {
          const token = jwt.sign({ _id: user._id }, getServerConfigs().jwtSecret);
          res.json({ token });
        }

        next({ status: 404, message: "Not found user" });
      });

    } catch (e) {
      winston.log("info", e);
      next({ status: 400, "error": "error in your request" });

    }
  }
}
export = AuthController;