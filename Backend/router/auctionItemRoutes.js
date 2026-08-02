import { addNewAuctionItem } from "../controllers/auctionItemController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import express from "express";
import { getAllItems, getAuctionDetails, getMyAuctionItems, removeFromAuction, republishItem } from "../controllers/auctionItemController.js";
import { trackCommissionStatus } from "../middlewares/trackCommisionStatus.js";

const router = express.Router();

router.post("/create", isAuthenticated, isAuthorized("Auctioneer"), trackCommissionStatus, addNewAuctionItem);

router.get("/allItems", getAllItems);
router.get("/auction/:id", isAuthenticated, getAuctionDetails);
router.get("/myItems", isAuthenticated, isAuthorized("Auctioneer"), getMyAuctionItems);
router.delete("/delete/:id", isAuthenticated, isAuthorized("Auctioneer"), removeFromAuction);
router.put("/item/republish/:id", isAuthenticated, isAuthorized("Auctioneer"), republishItem);


export default router;
