import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Auction } from "../models/auctionSchema.js";
import { Bid } from "../models/bidSchema.js";
import { User } from "../models/userSchema.js";

export const placeBid = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const auctionItem = await Auction.findById(id);

  if (!auctionItem) {
    return next(new ErrorHandler("Auction Item not found.", 404));
  }

  const { amount } = req.body || {};
  if (!amount) {
    return next(new ErrorHandler("Please place your bid.", 400));
  }

  // 1. Check if Auction has started (With 2 Min Buffer for Timezone Differences)
  //const startTime = new Date(auctionItem.startTime).getTime();
  //const currentTime = new Date().getTime();
  //if (startTime - currentTime > 2 * 60 * 1000) {
    //return next(new ErrorHandler("Auction has not started yet.", 400));
  //}

  // 2. Check if Auction has ended
  const endTime = new Date(auctionItem.endTime).getTime();
  if (currentTime > endTime) {
    return next(new ErrorHandler("Auction has already ended.", 400));
  }

  // 3. Amount Validations
  if (Number(amount) <= Number(auctionItem.currentBid)) {
    return next(
      new ErrorHandler("Bid amount must be greater than current bid.", 400)
    );
  }
  if (Number(amount) < Number(auctionItem.startingBid)) {
    return next(
      new ErrorHandler("Bid amount must be greater than starting bid.", 400)
    );
  }

  try {
    // Check if user already placed a bid on this item
    const existingBid = await Bid.findOne({
      "bidder.id": req.user._id,
      auctionItem: auctionItem._id,
    });

    const existingBidInAuction = auctionItem.bids.find(
      (bid) => bid.userId && bid.userId.toString() === req.user._id.toString()
    );

    if (existingBid && existingBidInAuction) {
      // Update existing bid
      existingBidInAuction.amount = amount;
      existingBid.amount = amount;
      await existingBid.save();
    } else {
      // Create new bid
      const bidderDetail = await User.findById(req.user._id);

      await Bid.create({
        amount,
        bidder: {
          id: bidderDetail._id,
          userName: bidderDetail.userName,
          profileImage: bidderDetail.profileImage?.url,
        },
        auctionItem: auctionItem._id,
      });

      auctionItem.bids.push({
        userId: req.user._id,
        userName: bidderDetail.userName,
        profileImage: bidderDetail.profileImage?.url,
        amount,
      });
    }

    // Update current bid on auction item and save
    auctionItem.currentBid = amount;
    await auctionItem.save();

    res.status(201).json({
      success: true,
      message: "Bid placed successfully.",
      currentBid: auctionItem.currentBid,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message || "Failed to place bid.", 500)
    );
  }
});