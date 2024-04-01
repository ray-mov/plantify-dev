import { Router } from "express";
import { currentUser } from "../middlewares/currentuser.middleware";
import { authRequired } from "../middlewares/authrequired.moddleware";
const router = Router()


router.get('/api/users/currentuser',authRequired, currentUser, (req, res) => {

 res.send({currentUser: req.currentUser || null})

})

export { router as currentUserRouter }