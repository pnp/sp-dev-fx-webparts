export interface IHappyBirthdayCardProps {
  userName: string;
  jobDescription: string;
  birthday: string;
  anniversary?: boolean;
  congratulationsMsg?: string;
  userEmail: string;
  imageTemplate: number; // Change this to a number to represent the index of the imageTemplate array
}