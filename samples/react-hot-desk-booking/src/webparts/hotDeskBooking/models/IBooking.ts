import { IResource } from './IResource';

export interface IBooking {
  id: string;
  title: string;
  resource: IResource | null;
  bookingDate: Date;
  bookedBy: string;
  notes: string;
}
