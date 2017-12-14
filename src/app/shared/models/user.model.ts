export class User {
  public username: string;
  public name: string;
  public DoB: Date;
  public DoBString: string;
  public bio: string;

  constructor(username: string, name: string, DoB: Date, bio: string) {
    this.username = username;
    this.name = name;
    this.DoB = new Date(DoB);
    this.bio = bio;
  }

  setDoBString() {
    this.DoBString = this.DoB.toDateString();
  }
}
