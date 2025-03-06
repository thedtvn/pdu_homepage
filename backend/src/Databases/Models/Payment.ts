import { model, Schema } from "mongoose";

const payment = new Schema({
    paymentId: { type: String, required: true, unique: true },
    paymentCode: [{
        code: { type: String, required: true, unique: true },
        used: { type: Boolean, default: false },
    }],
    status: { type: String, enum: ["paid", "pending", "pending+"], default: "pending" },
    paid: { type: Number, default: 0 },
    userId: { type: String, required: true },
    classs: [{ 
        classId: { type: String, required: true },
        className: { type: String, required: true },
        amount: { type: Number, required: true },
    }],
    other: [
        {
            name: { type: String, required: true },
            amount: { type: Number, required: true },
        }
    ],
});

const paymentModel = model('payment', payment);

export default paymentModel;
