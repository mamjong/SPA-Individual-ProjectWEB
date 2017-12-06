import {User} from "../shared/user.model";

export class Concept {
  public title: string;
  public genre: string;
  public description: string;
  public likes: number;
  public artImagePaths: [{
    path: string;
  }];
  public user: User;

  constructor(title: string, genre: string, description: string, likes: number, artImagePaths: [{path: string;}], user: User) {
    this.title = title;
    this.genre = genre;
    this.description = description;
    this.likes = likes;
    this.artImagePaths = artImagePaths;
    this.user = user;
  }
}
