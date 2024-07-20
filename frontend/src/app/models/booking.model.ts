// booking.model.ts

export interface Booking {
  _id: string; // Assuming MongoDB generates the ID as a string
  busId: string;
  passengers: PassengerDetail[]; // Array of passenger details
  payableAmount: number;
}

export interface PassengerDetail {
  name: string;
  age?: number | null;
  gender: string;
  phoneNumber: string;
  seatNo: string;
}
