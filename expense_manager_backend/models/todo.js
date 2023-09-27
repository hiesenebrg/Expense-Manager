const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      enum: ["Food", "Transportation", "Entertainment", "Utilities","Healthcare" ],
      required: true,
    },
    amount: {
      type: Number,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
