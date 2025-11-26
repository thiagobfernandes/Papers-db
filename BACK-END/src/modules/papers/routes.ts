import { Router } from "express";
import { ExpressRequest } from "../../shared/dtos/express-request-dto";
import { JwtMiddleware } from "../../shared/middleware/jwt/jwt-middleware";
import { RequestHandler } from "express";
import { BuildCreatePapersControllerFactory, BuildDeletePapersControllerFactory, BuildFindPaginationControllerFactory, BuildFindPapersByIdControllerFactory, BuildUpdatePaginationControllerFactory } from "./papers.factory";
import { AdapterRoute } from "../../shared/http/adapters/route-adapter";
import { IsAdminMiddleware } from "../../shared/middleware/jwt/is-admin-middleware";
import { documentUploadMiddleware } from "../../shared/middleware/multer/document-upload";

const jwtMiddleware = new JwtMiddleware();
const auth: RequestHandler = (req, res, next) =>
  jwtMiddleware.verifyToken(req as ExpressRequest, res, next);

const isAdminMiddlewareInstance = new IsAdminMiddleware();
const isAdmin: RequestHandler = (req, res, next) => {
  isAdminMiddlewareInstance.verifyToken(req as ExpressRequest, res, next)
}
const router = Router();

router.post(
  "/papers",
  auth,
  documentUploadMiddleware, // Adicionando o middleware de upload
  AdapterRoute(BuildCreatePapersControllerFactory(), "create-papers")
);

router.put("/papers/:id", auth, AdapterRoute(
  BuildUpdatePaginationControllerFactory(),
  "update-papers"
));

router.get("/papers/adm", auth, isAdmin, AdapterRoute(
  BuildFindPaginationControllerFactory(),
  "find-papers-pagination"
));

router.get("/papers/:id", auth, AdapterRoute(
  BuildFindPapersByIdControllerFactory(),
  "find-paper-by-id"
));

router.get("/papers", AdapterRoute(
  BuildFindPaginationControllerFactory(),
  "find-papers-pagination"
));


router.delete("/papers/:id", auth,
  AdapterRoute(BuildDeletePapersControllerFactory(),
    "delete-paper-by-id"))

export default router;
