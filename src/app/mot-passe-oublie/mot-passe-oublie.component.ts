import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../MustMatch';
import { ResetPassword } from '../models/restPassword';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-mot-passe-oublie',
  templateUrl: './mot-passe-oublie.component.html',
  styleUrls: ['./mot-passe-oublie.component.css']
})
export class MotPasseOublieComponent implements OnInit {

  mdpForm: FormGroup;
  password = new FormControl(null, [Validators.required, Validators.minLength(8)]);
  confirmPassword = new FormControl(null, [Validators.required, Validators.minLength(8)]);
  resetpassword = new ResetPassword();
  confirmation: any;
  token : string;


  constructor(private toastr: ToastrService,
     public fb: FormBuilder,
    private route: ActivatedRoute,
    private tokenService: TokenStorageService,
    private userService : AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.checkToken();
    this.mdpForm = this.fb.group({
      password: this.password,
        confirmPassword: this.confirmPassword
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  checkToken() {
    if (this.tokenService.getExprirationDate(this.token) < new Date()) {
      window.alert("URL Expired");
      window.close();

    }
  }

  confirmer(){
    this.resetpassword.token = this.token;
      console.log(this.token);
      this.resetpassword.password = this.password.value;
      this.userService.resetPassword(this.resetpassword).subscribe(next => {
        this.toastr.success("mot de passe modifié avec succès")
        setTimeout(() => {
            this.router.navigateByUrl("/");
          }
          , 5000);

      });
    }

}
