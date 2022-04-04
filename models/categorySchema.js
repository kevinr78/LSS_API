const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  serial_No: {
    type: Number,
    required: true,
  },
  user_id : {
    type: Number,
    required: true,
  },
  integrated_category_id: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  integrated_category_label: {
    type: String,
    required: true,
  },
  time_of_day: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
