import { Router } from "express";
import { currentUser } from "@m9devs/common";
import { authRequired } from "@m9devs/common";
const router = Router()


router.get('/api/users/currentuser',authRequired, currentUser, (req, res) => {

 res.send({currentUser: req.currentUser || null})

})

export { router as currentUserRouter }