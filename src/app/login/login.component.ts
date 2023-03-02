import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { loginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginS:loginService) { }

  ngOnInit(): void {
  }

  login(form: NgForm)
  {
    const email = form.value.email;
    const password = form.value.password;
    this.loginS.login(email, password);
  }
}
