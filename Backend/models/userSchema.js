import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      minLength: [3, "Username must be at least 3 characters."],
      maxLength: [40, "Username cannot exceed 40 characters."],
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      select: false,
      required: true,
      minLength: [8, "Password must contain at least 8 characters."],
      //maxLength: [32, "Password cannot exceed 32 characters."]
    },
    address: String,
    phoneNumber: {
        type: String,
        minLength: [10, "Phone number must contain exactly 10 characters."],
        maxLength: [10, "Phone number cannot exceed 10 characters."]
    },
    profileImage: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    paymentMethods: {
        bankTransfer: {
            bankAccountNumber: String,
            bankAccountName: String,
            bankName: String,
            ifscCode: String
        },
        upi: {
            upiId: String
        },
    },
    role: {
        type: String,
        enum: ["Auctioneer", "Bidder", "Admin"],
        default: "Bidder"

    },
    unpaidCommissions: {
        type: Number,
        default: 0
    },
    auctionWon: {
        type: Number,
        default: 0
    },
    moneySpent: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    },
    {timestamps: true} 
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

export const User = mongoose.model("User", userSchema);