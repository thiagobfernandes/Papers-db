import { Router } from "express";
import { ExpressRequest } from "../../shared/dtos/express-request-dto";
import { JwtMiddleware } from "../../shared/middleware/jwt/jwt-middleware";
import { RequestHandler } from "express";
import { BuildCreatePlatformControllerFactory, BuildDeletePlatformControllerFactory, BuildFindPlatformByIdControllerFactory, BuildFindPlatformPaginationControllerFactory, BuildUpdatePlatformControllerFactory } from "./platform.factory";
import { AdapterRoute } from "../../shared/http/adapters/route-adapter";

const jwtMiddleware = new JwtMiddleware();
const auth: RequestHandler = (req, res, next) =>
  jwtMiddleware.verifyToken(req as ExpressRequest, res, next);

const router = Router();

router.post(
  "/platform",
  auth,
  AdapterRoute(BuildCreatePlatformControllerFactory(), "create-platform")
);

router.put("/platform/:id", auth, AdapterRoute(
  BuildUpdatePlatformControllerFactory(),
  "update-platform"
));

router.get("/platform/:id", auth, AdapterRoute(
  BuildFindPlatformByIdControllerFactory(),
  "find-platform-by-id"
));

router.get("/platform", AdapterRoute(
  BuildFindPlatformPaginationControllerFactory(),
  "find-platform-pagination"
));

router.delete("/platform/:id", auth,
  AdapterRoute(BuildDeletePlatformControllerFactory(),
    "delete-platform-by-id"))

export default router;