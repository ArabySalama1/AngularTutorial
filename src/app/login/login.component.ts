import { Component, OnInit } from '@angular/core';
import { User } from './User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  topics=['Angular','React','Vue'];

  userModel=new User();
  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.userModel);
  }

}
