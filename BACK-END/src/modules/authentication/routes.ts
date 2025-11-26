import { Router } from "express";
import { LoginController } from "./login-controller";
import { LoginService } from "./login-service";

const router = Router()
const loginService = new LoginService()
const loginController = new LoginController(loginService)

router.post('/login', (req,res) => {
    loginController.login(req,res)
})

export default router;