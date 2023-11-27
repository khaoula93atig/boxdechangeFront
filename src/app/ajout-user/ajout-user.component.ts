import { Component, OnInit } from '@angular/core';
import { BankService } from '../services/bank.service';
import { BoxService } from '../services/box.service';
import { Box } from '../models/Box';
import { User } from '../models/User';
import { Form, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Bank } from '../models/Bank';

@Component({
  selector: 'app-ajout-user',
  templateUrl: './ajout-user.component.html',
  styleUrls: ['./ajout-user.component.css']
})
export class AjoutUserComponent implements OnInit {
  boxs:Box[]=[]
  banks:Bank[]=[]
  user=new User()
  boxId:string=''
  bankId:string=''
  role:string ='box'

  constructor(private boxService:BoxService,
    private bankService:BankService,
    private authService:AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListBox()
    this.getListBank()
  }

  getListBox(){
    this.boxService.GetAllBox().subscribe(res=>{
      console.log(res)
      this.boxs=res

    })
  }

  getListBank(){
    this.bankService.GetAllBank().subscribe(res=>{
      console.log(res)
      this.banks=res

    })
  }
  ajoutUser(){
    if(this.role=='box'){
      this.user.box=this.boxs.find(box => box.idbox === this.boxId)
      this.user.username=this.user.nom+'-'+this.boxId
    }
    else if(this.role=="bank"){
      this.user.bank=this.banks.find(bank => bank.idBank === this.bankId)
      this.user.username=this.user.nom+'-'+this.bankId
    }
    else if(this.role=="admin"){
      this.user.username=this.user.nom+'-admin'
    }
    this.user.password='12345678'
    console.log(this.user)
    console.log(this.role)
    this.authService.register(this.user,this.role).subscribe(res=>{
      console.log(res)
      this.user=new User()
      this.toastr.success('avec succès', 'user est ajouté!');

    })
    

  }
  

}
