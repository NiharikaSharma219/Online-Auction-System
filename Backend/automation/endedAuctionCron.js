import cron from "node-cron";
import { Auction } from "../models/auctionSchema.js";
import { User } from "../models/userSchema.js";
import { Bid } from "../models/bidSchema.js";
import { sendEmail } from "../utils/sendEmail.js";
import { calculateCommission } from "../controllers/commissionController.js";

export const endedAuctionCron = () => {
    cron.schedule("*/1 * * * *", async () => {
        const now = new Date();
        const endedAuctions = await Auction.find({
            endTime: { $lt: now },
            commissionCalculated: false,
        });
        for (const auction of endedAuctions) {
            try {
                const commissionAmount = await calculateCommission(auction._id);
                auction.commissionCalculated = true;
                const highestBidder = await Bid.findOne({
                    auctionItem: auction._id,
                    amount: auction.currentBid,
                });
                const auctioneer = await User.findById(auction.createdBy);
                auctioneer.unpaidCommissions = commissionAmount;
                if(highestBidder){
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
                    const message = `Dear ${bidder.userName},\n\nCongratulations! You have won the auction for ${auction.title}.\n\nBefore proceeding for payment, contact your auctioneer via email: ${auctioneer.email} \n\nPlease complete your payment using one of the following methods:\n\n1. **Bank Transfer**:\n- Account Name: ${auctioneer.paymentMethods.bankTransfer.bankAccountName}\n- Account Number: ${auctioneer.paymentMethods.bankTransfer.bankAccountNumber}\n- Bank Name: ${auctioneer.paymentMethods.bankTransfer.bankName}\n- IFSC Code: ${auctioneer.paymentMethods.bankTransfer.ifscCode}\n\n2. **UPI**:\n- Pay via UPI ID: ${auctioneer.paymentMethods.upi.upiId}\n\n3. **Cash on Delivery (COD)**:\n- If you prefer COD, you must pay 20% of the total amount upfront before delivery.\n- To pay the 20% upfront, use any of the above methods.\n- The remaining 80% will be paid upon delivery.\n- If you want to see the condition of your auction item, then send an email to: ${auctioneer.email}\n\nPlease ensure your payment is completed by the due date. Once we confirm the payment, the item will be shipped to you.\n\nThank you for participating!\n\nBest regards,\nAuction Team`
                    console.log("SENDING EMAIL TO HIGHEST BIDDER");
                    sendEmail({
                        email: bidder.email,
                        subject,
                        message
                    });
                    console.log("SUCCESSFULLY EMAIL SEND TO HIGHEST BIDDER");
                }else{
                    await auction.save();
                }
            } catch (error) {
                console.error(" Error in ended auction cron loop:", error);
            }
        }
    });
};