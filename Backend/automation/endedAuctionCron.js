import cron from "node-cron";
import { Auction } from "../models/auctionSchema.js";
import { User } from "../models/userSchema.js";
import { Bid } from "../models/bidSchema.js";
import { sendEmail } from "../utils/sendEmail.js";
import { calculateCommission } from "../controllers/commissionController.js";

export const endedAuctionCron = () => {
    cron.schedule("*/1 * * * *", async () => {
        const now = new Date();
        console.log("--> Running Ended Auction Cron...");

        try {
            const endedAuctions = await Auction.find({
                endTime: { $lt: now },
            });

            console.log(`Found ${endedAuctions.length} ended auctions to process.`);

            for (const auction of endedAuctions) {
                if (auction.commissionCalculated) {
                    continue;
                }

                try {
                    console.log("Processing auction ID:", auction._id);

                    // Fetch highest bidder
                    const highestBidder = await Bid.findOne({
                        auctionItem: auction._id,
                    }).sort({ amount: -1 });

                    console.log("Highest Bidder Found:", highestBidder ? highestBidder._id : "NO BIDDER FOR THIS ITEM");

                    const commissionAmount = await calculateCommission(auction._id);
                    auction.commissionCalculated = true;

                    const auctioneer = await User.findById(auction.createdBy);

                    if (highestBidder) {
                        auction.highestBidder = highestBidder.bidder.id;
                        await auction.save();

                        const bidder = await User.findById(highestBidder.bidder.id);

                        await User.findByIdAndUpdate(
                            bidder._id,
                            {
                                $inc: {
                                    moneySpent: highestBidder.amount,
                                    auctionWon: 1,
                                },
                            },
                            { returnDocument: 'after' }
                        );

                        await User.findByIdAndUpdate(
                            auctioneer._id,
                            {
                                $inc: {
                                    unpaidCommissions: commissionAmount,
                                },
                            },
                            { returnDocument: 'after' }
                        );

                        const subject = `Congratulations! You won the auction for ${auction.title}`;
                        const message = `Dear ${bidder.userName},\n\nCongratulations! You have won the auction for ${auction.title}.\n\nBefore proceeding for payment, contact your auctioneer via email: ${auctioneer.email} \n\nPlease complete your payment using one of the following methods:\n\n1. **Bank Transfer**:\n- Account Name: ${auctioneer.paymentMethods?.bankTransfer?.bankAccountName || "N/A"}\n- Account Number: ${auctioneer.paymentMethods?.bankTransfer?.bankAccountNumber || "N/A"}\n- Bank Name: ${auctioneer.paymentMethods?.bankTransfer?.bankName || "N/A"}\n- IFSC Code: ${auctioneer.paymentMethods?.bankTransfer?.ifscCode || "N/A"}\n\n2. **UPI**:\n- Pay via UPI ID: ${auctioneer.paymentMethods?.upi?.upiId || "N/A"}\n\n3. **Cash on Delivery (COD)**:\n- If you prefer COD, you must pay 20% of the total amount upfront before delivery.\n\nThank you for participating!\n\nBest regards,\nAuction Team`;

                        console.log("SENDING EMAIL TO HIGHEST BIDDER:", bidder.email);

                        await sendEmail({
                            email: bidder.email,
                            subject,
                            message
                        });

                        console.log("SUCCESSFULLY EMAIL SENT TO HIGHEST BIDDER");
                    } else {
                        console.log("Skipping email as no bidder was found for auction:", auction.title);
                        await auction.save();
                    }
                } catch (error) {
                    console.error("Error processing single auction in cron:", error.message);
                }
            }
        } catch (error) {
            console.error("Error in ended auction cron loop:", error.message);
        }
    });
};



