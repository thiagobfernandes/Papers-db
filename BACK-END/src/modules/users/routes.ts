import { Router } from "express";
import { JwtMiddleware } from "../../shared/middleware/jwt/jwt-middleware";
import { ExpressRequest } from "../../shared/dtos/express-request-dto";
import { AdapterRoute } from "../../shared/http/adapters/route-adapter";
import {
  BuildCreateUserControllerFactory,
  BuildFindUserByIdControllerFactory,
  BuildUpdateUserControllerFactory,
} from "./users.factory";
import { RequestHandler } from "express";

const jwtMiddleware = new JwtMiddleware();
const auth: RequestHandler = (req, res, next) =>
  jwtMiddleware.verifyToken(req as ExpressRequest, res, next);

 const router = Router();

router.post("/user/register", AdapterRoute(BuildCreateUserControllerFactory(), "create-user"));

router.get("/user/:id", auth, AdapterRoute(BuildFindUserByIdControllerFactory(), "find-user-by-id"));

router.put("/user/:id", auth, AdapterRoute(BuildUpdateUserControllerFactory(), "update-user"));

export default router;
