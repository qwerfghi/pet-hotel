export class Visitor {
  idowner: number;
  ownerName: string;
  ownerLastName: string;
  ownerPatronymic: string;
  passport: string;
  phoneNum: string;
  email: string;
  discount: string;
  address: {
    idaddress: number;
    region: string;
    locality: string;
    street: string;
    houseNum: number;
    apartmentNum: number
  };
}
