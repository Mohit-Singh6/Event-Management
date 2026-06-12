

    // .model.ts is just a naming convention, it's literally same as .ts file, but it indicates that this file contains Mongoose model definitions and related TypeScript interfaces for the Event Management application. Even if you write normal code in this, it would still work.


// Database models exports
export { default as Event } from './event.model';
export { default as Booking } from './booking.model';

// TypeScript interfaces exports
export type { IEvent } from './event.model';
export type { IBooking } from './booking.model';