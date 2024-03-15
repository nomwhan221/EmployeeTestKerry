import { Role } from "./role";

export class User {
  constructor(
    public id = "0",
    public fName_th = "",
    public lName_th = "",
    public fName_en = "",
    public lName_en = "",
    public idCard = "",
    public startDate = "",
    public endDate = null,
    public startDatetime = "",
    public endDatetime = null,
    public status = null,
    public createDate = "", // 2024-03-14T06:16:27.349Z,
    public createBy = "",
    public updateDate = "",
    public updateBy = ""
  ) {}
  get name() {
    return this.fName_th + " " + this.lName_th;
  }
}
