import { Component, OnInit } from '@angular/core';
import { Enchere } from 'src/app/models/Enchere';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { EnchereService } from 'src/app/services/enchere.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-form-enchere',
  templateUrl: './form-enchere.component.html',
  styleUrls: ['./form-enchere.component.css']
})
export class FormEnchereComponent implements OnInit {

  constructor(private encherService: EnchereService,private authService:AuthService,
    private toastr: ToastrService,private router:Router,
    private tokenStorage:TokenStorageService
    ) { }
    staticValue = '';
counter = 0;
 // the counter for the auto-increment

  referenceEnchereValue = this.staticValue + this.counter;
  ngOnInit(): void {
    this.counter++;
  }

  

  saveEnchere(form){
    /*form.value.dateDebut = new Date(form.value.dateDebut)
    
    form.value.dateDebut =datePipe.transform(form.value.dateDebut , "yyyy-MM-dd HH:mm:ss");*/
    //const datePipe = new DatePipe('en-US');
    //this.authService.decodeToken().subscribe(res=>{
      //console.log(res)
      //this.authService.getUserDataByUserName(res["sub"]).subscribe(res=>{
      //  console.log(res)
       // form.value.user.id=res["id"]
       //form["user"]=1
       let e:Enchere = form.value
      // e.idEnchere="gijgjiz"
       let user = new User()
    user.id= this.tokenStorage.getUser().id
       e.user=user
       e.dateDebut=new Date((form.value.dateDebut).toLocaleString())
       e.heureFin=new Date((form.value.heureFin).toLocaleString())
       console.log(e);
       this.encherService.ajouter(e).subscribe(data=>{console.log(data)
       if(data!=null){
        this.toastr.success('avec succès', 'Votre Enchère est Lancée!');
        this.router.navigateByUrl('/dash/propositionList');
       }else{
        this.toastr.error('error','echéc d`operation')
       }
      })
    
    //console.log(form.value)
    //this.encherService.ajouter(form.value).subscribe(data=>console.log("ok"))

  }
  btnClick= function () {
    this.router.navigateByUrl('/dash/propositionList');
};
}