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

// 'type: Schema.Types.ObjectId, ref: 'Celebrity'' will create a relation between the `Movie` model and the `Celebrity` model

const Pool = model("Pool", poolSchema);

module.exports = Pool;
