import {User} from "./user.model";

export class Concept {
  public id: string;
  public title: string;
  public genre: string;
  public description: string;
  public likes: number;
  public art: [{
    _id: string,
    path: string;
  }];
  public user: string;

  constructor(id: string, title: string, genre: string, description: string, likes: number, art: [{_id: string, path: string;}], user: string) {
    this.id = id;
    this.title = title;
    this.genre = genre;
    this.description = description;
    this.likes = likes;
    this.art = art;
    this.user = user;
  }
}
