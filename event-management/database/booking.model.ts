import { Schema, model, models, Document, Types } from 'mongoose';
import Event from './event.model';

// Shape of a Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event', // Reference to Event collection
      required: [true, 'Event ID is required'], // [boolean, errorMessage]
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator(email: string) {
          // Validate email format
          const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

          return emailRegex.test(email);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    // Automatically adds createdAt and updatedAt
    timestamps: true,
  }
);

// Ensure the referenced event exists before saving a booking
BookingSchema.pre('save', async function () {
  // Skip validation when eventId hasn't changed
  if (!this.isModified('eventId') && !this.isNew) {
    return;
  }

  try {
    const eventExists = await Event.findById(this.eventId).select('_id');

    if (!eventExists) {
      const error = new Error(
        `Event with ID ${this.eventId} does not exist`
      );
      error.name = 'ValidationError';
      throw error;
    }
  } catch {
    const error = new Error(
      'Invalid Event ID format or database error'
    );
    error.name = 'ValidationError';
    throw error;
  }
});

// Fast lookup of bookings for an event
BookingSchema.index({ eventId: 1 });

// Fast retrieval of recent bookings for an event
BookingSchema.index({
  eventId: 1,
  createdAt: -1,
});

// Fast lookup of bookings by email
BookingSchema.index({ email: 1 });

// Prevent duplicate booking for the same event and email
BookingSchema.index(
  { eventId: 1, email: 1 },
  {
    unique: true,
    name: 'uniq_event_email',
  }
);

const Booking =
  models.Booking ||
  model<IBooking>('Booking', BookingSchema);

export default Booking;