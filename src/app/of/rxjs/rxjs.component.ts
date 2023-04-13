import { Component } from '@angular/core';
import { combineLatest, filter, fromEvent, map, of } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent {

  users = [
    { id: '1', name: "Mesud", isActive: true },
    { id: "2", name: "Dzemil", isActive: true },
    { id: "3", name: "Erdal", isActive: true }
  ];

  user$ = of(this.users);
  userName$ = this.user$.pipe(map((user) => user.map((user) => user.name)));

  userFilter$ = this.user$.pipe(
    filter((users) => users.every((user) => user.isActive)))

  documentClick$ = fromEvent(document, 'click');

data$ = combineLatest([
  this.user$,
  this.userName$,
  this.userFilter$,
]).pipe(map(([users,userName,userFliter])=>({
  users,
  userName,
  userFliter,
})))

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      console.log("users", user);
    });

    this.documentClick$.subscribe((e) => {
      document.body.style.background = 'red';
      console.log('e', e);
    })
  }
};