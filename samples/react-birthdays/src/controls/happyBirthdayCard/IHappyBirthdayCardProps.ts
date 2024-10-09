export interface IHappyBirthdayCardProps {
  userName?:string | undefined;
  jobDescription?: string;
  birthday: string;
  anniversary: boolean;
  userEmail:string;
  congratulationsMsg?: string;
  imageTemplate:string;
}
