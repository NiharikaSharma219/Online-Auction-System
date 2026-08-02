import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
    deleteAuctionItem,
    deletePaymentProof,
    fetchAllUsers,
    getAllPaymentProofs,
    getPaymentProofDetail,
    monthlyRevenue,
    updateProofStatus,
} from "../controllers/adminController.js";

const router = express.Router();

router.delete(
    "/auctionitem/delete/:id",
    isAuthenticated,
    isAuthorized("Admin"),
    deleteAuctionItem
);

router.get(
    "/paymentProofs/getall",
    isAuthenticated , 
    isAuthorized("Admin"), 
    getAllPaymentProofs
);

router.get(
    "/paymentProof/:id",
    isAuthenticated , 
    isAuthorized("Admin"), 
    getPaymentProofDetail
);

router.put(
    "/paymentProof/status/update/:id",
    isAuthenticated , 
    isAuthorized("Admin"), 
    updateProofStatus
);

router.delete(
    "/paymentProof/delete/:id",
    isAuthenticated , 
    isAuthorized("Admin"), 
    deletePaymentProof
);

router.get(
    "/users/getall",
    isAuthenticated,
    isAuthorized("Admin"),
    fetchAllUsers
);

router.get(
    "/monthlyincome",
    isAuthenticated,
    isAuthorized("Admin"),
    monthlyRevenue
);

export default router;
