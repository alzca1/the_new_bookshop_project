import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AppUser } from '../models/app-user';
import { User } from '../users/user.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  save(user: firebase.default.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
    });
  }

  // la función get devolvera un observable de tipo AppUser(la interface
  // que hemos definido antes). Lo que hace valueChanges es "Returns 
  //an Observable of document data."
  get(uid: string):Observable<AppUser> {
    return this.db.object<AppUser>('/users/' + uid).valueChanges();
  }
}
