const mongoose = require('mongoose');

const formResponseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model for user authentication
    required: true,
  },
  responses: {
    problemSolutions: {
      type: [String],
      required: true,
    },
    valueProposition: {
      type: String,
      required: true,
    },
    competitiveAdvantage: {
      type: String,
      required: true,
    },
    customerSegments: {
      type: [String],
      required: true,
    },
    alternativeOffers: {
      type: [String],
      required: true,
    },
    communicationChannels: {
      type: String,
      default: '', // Optional field
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('FormResponse', formResponseSchema);
