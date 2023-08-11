export class Employee {
  constructor(
    public firstName?: string,
    public lastName?: string,
    public gender?: string,
    public dateOfBirth?: Date,
    public vocals?: string,
    public instruments?: string,
    public paymentMode?: string,
    public dateOfJoining?: Date,
    public address?: string,
    public mobileNr?: number,
    public id?: number
  ) {}
}
