//import { Component, OnInit } from '@angular/core';
import { Enchere } from '../models/Enchere';
import { AuthService } from '../services/auth.service';
import { EnchereService } from '../services/enchere.service';
import { PropositionService } from '../services/proposition.service';
//import { MatSort, Sort } from '@angular/material/sort';
//import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-proposition-list',
  templateUrl: './proposition-list.component.html',
  styleUrls: ['./proposition-list.component.css']
})
export class PropositionListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  listenchere:any[]=[]
  displayStyle = "none";
  enchere=new Enchere();
  propositionsForSelectedEnchere : any[]=[];
  constructor(private enchereService:EnchereService,private propositionService:PropositionService
    ,private authService:AuthService) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem("auth-token"));
    console.log("tet aaa");
    this.GetAllEnchere()
    this.sort = new MatSort();
    this.propositionService.GetAll().subscribe(res=>{
      console.log(res);
    },(err)=>{

      console.log(err);
    })
  }
  GetAllEnchere(){

    this.authService.decodeToken().subscribe(res=>{
      this.authService.getUserDataByUserName(res["sub"]).subscribe(res=>{
        this.enchereService.GetAllByUser(res["id"]).subscribe((data:any[])=>{
          this.listenchere=data
          console.log(this.listenchere)
        })
      })
    })

   /* this.authService.decodeToken().subscribe(res=>{
      this.authService.getUserDataByUserName(res["sub"]).subscribe(res=>{
        this.enchereService.GetAllByUser(res["id"]).subscribe((data:any[])=>{this.listenchere=data
          console.log(this.listenchere)
        })
       
      
    })


  }*/

  }
  sortByKey(array: any[], key: string, ascending: boolean = true) {
    return array.sort((a, b) => {
      let comparison = 0;
      if (a[key] > b[key]) {
        comparison = 1;
      } else if (a[key] < b[key]) {
        comparison = -1;
      }
      return ascending ? -comparison : comparison; // flip the comparison value if ascending is false
    });
  }
  sortPropositions(key: string, ascending: boolean = true) {
    this.propositionsForSelectedEnchere = this.sortByKey(this.propositionsForSelectedEnchere, key, ascending);
  }
  
  saveEnchere(form){
    console.log(form.value);
   /* let prop = 
    {
      "idProposition":0,
      "enchere":{ "idEnchere" :form.controls['idEnchere'].value},
      "user":{"id" :0},
      "taux_soumission" : form.controls['tauxSoumission'].value
    }*/
    //console.log(prop)
    this.authService.decodeToken().subscribe(res=>{
     // console.log(res)
    //  console.log(res["sub"])
    this.authService.getUserDataByUserName(res["sub"]).subscribe(res=>{
        console.log( res);
    let prop = 
    {
      "idProposition":0,
      "enchere":{ "idEnchere" :form.controls['idEnchere'].value},
      "user":{"id" :res["id"]},
      "taux_soumission" : form.controls['tauxSoumission'].value
    }
    console.log(prop); 
    this.propositionService.Add(prop).subscribe(res=>{console.log(res)},(err)=>{
      console.log(err)
    })
        //prop.user.id=res["id"]
      })
    })
    //console.log(prop)
    

  }
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
 getbyindex(index:number){
  this.propositionsForSelectedEnchere=[];
    for(let i=0; i<this.listenchere.length;i++){
      if(i==index){
        this.enchere=this.listenchere[i]
        this.getPropositionsByEnchere(this.enchere)
      }
    }
    console.log(this.enchere)
  }

  getPropositionsByEnchere(enchere: Enchere) {
    let latestPropositions = [];
    this.propositionService.getByEnchereId(enchere.idEnchere).subscribe((res: any[]) => {
      for(let i=0; i<res.length; i++){
        let existingProposition = latestPropositions.find(p => p.userId === res[i].userId);
        if(existingProposition === undefined){
          latestPropositions.push({userId: res[i].userId, propositions: [res[i]]});
        }else{
          if(res[i].idProposition > existingProposition.propositions[0].idProposition){
            existingProposition.propositions[1] = existingProposition.propositions[0];
            existingProposition.propositions[0] = res[i];
          }else if(res[i].idProposition > existingProposition.propositions[1]?.idProposition){
            existingProposition.propositions[1] = res[i];
          }
        }
      }
      this.propositionsForSelectedEnchere = latestPropositions
      .reduce((acc, val) => acc.concat(val.propositions), [])
      .sort((a, b) => b.TauxSoumission - a.TauxSoumission);
    
    });
  }
  

}
