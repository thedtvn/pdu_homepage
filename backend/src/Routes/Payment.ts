import { Route, default as RouteType } from "../Classes/Routes";
import { Request, Response } from "express";

export default class Payment extends RouteType {

    public path = "/payment";

    @Route("/create", "post")
    public async create(req: Request, res: Response) {
        if (req.auth?.role !== "admin") return res.status(403).json({ error: "Permission denied" });

        const { , description } = req.body;
        

        // Call payment gateway here
        // const payment = await PaymentGateway.createPayment(amount, description);
        // return res.json(payment);
        return res.json({ amount, description });
    }

}