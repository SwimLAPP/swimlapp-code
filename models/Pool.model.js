const { Schema, model } = require("mongoose");

const poolSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      address: String,
      postalCode: String,
      city: String,
    },
    poolSize: {
      type: String,
      enum: ["25m", "50m", "both"],
    },
    description: String,
    rating: Number,
  },

  {
    timestamps: true,
  }
);

const Pool = model("Pool", poolSchema);

module.exports = Pool;
