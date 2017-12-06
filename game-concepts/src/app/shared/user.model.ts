export class User {
  public username: string;
  public name: string;
  public DoB: string;
  public bio: string;

  constructor(username: string, name: string, DoB: string, bio: string) {
    this.username = username;
    this.name = name;
    this.DoB = DoB;
    this.bio = bio;
  }
}
