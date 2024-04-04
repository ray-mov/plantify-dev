import { Router, Request, Response} from "express";
import { authRequired } from "@m9devs/common";


const router = Router();

router.post('./api/products', authRequired, (req: Request, res:Response)=>{
 
})


export { router as newProductRouter}