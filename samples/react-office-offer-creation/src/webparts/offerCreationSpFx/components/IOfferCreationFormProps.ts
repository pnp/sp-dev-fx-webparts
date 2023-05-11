import{ IOffer } from '../../../model/IOffer';

export interface IOfferCreationFormProps {
  offerCreated: boolean;
  createOffer: (offer: IOffer) => void;
}