import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginUser } from '../../interfaces/loginUser.interface';
import { AuthService } from '../auth/auth.service';
import { GlobalService } from '../../services/global.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',Validators.required),
  })

  constructor(
    private authService:AuthService,
    private router:Router,
    private global:GlobalService,
    private userService:UserService,
  ) { }

  ngOnInit(): void {
     
  }

  async Login(data:loginUser){
      
      this.authService.login(data).subscribe(didLogIn =>{
        if(didLogIn){          
          this.router.navigate(['dashboard']);
        }
      })
      
  }
  registerUser(data:loginUser){
    
    data.user_name = 'tempuser';
    this.userService.insertUser(data).subscribe(res=>{
      console.log('res',res);
      
    })
  }

}
