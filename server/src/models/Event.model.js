const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event must have a title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Event must have a description'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Event must have a category'],
      enum: ["Technology", "Education", "Conference", "Networking", "Workshop", "meeting"],
    },
    startTime: {
      type: Date,
      required: [true, 'Event must have a start time'],
    },
    endTime: {
      type: Date,
      required: [true, 'Event must have an end time'],
      validate: {
        validator: function (val) {
          return val > this.startTime;
        },
        message: 'End time must be after start time',
      },
    },
    location: {
      type: String,
      required: [true, 'Event must have a location'],
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        status: {
          type: String,
          enum: ["joined", "interested", "left"],
          default: "joined",
        },
        joinedAt: {
          type: Date,
          default: () => new Date(),
        }
      }
    ],
    image: {
      name: { type: String },
      url: { type: String },
      type: { type: String },
      size: { type: Number },
      public_id: { type: String },
    },
    attachments: [
      {
        name: { type: String },
        url: { type: String },
        type: { type: String },  // image, pdf, etc.
        size: { type: Number },
        public_id: { type: String },
      }
    ],

    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    reminderSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for performance
eventSchema.index({ title: 'text', description: 'text', location: 'text' });
eventSchema.index({ startTime: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ organizer: 1 });

// Update status based on time
eventSchema.method.updateStatus = function () {
  const now = new Date();
  if (now < this.startTime) {
    this.status = 'upcoming';
  } else if (now >= this.startTime && now <= this.endTime) {
    this.status = 'ongoing';
  } else {
    this.status = 'completed';
  }
  return this.save();
};


module.exports = mongoose.model('Event', eventSchema);