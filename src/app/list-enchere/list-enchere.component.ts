import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { cpuUsage } from 'process';
import { Enchere } from '../models/Enchere';
import { AuthService } from '../services/auth.service';
import { EnchereService } from '../services/enchere.service';
import { PropositionService } from '../services/proposition.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-list-enchere',
  templateUrl: './list-enchere.component.html',
  styleUrls: ['./list-enchere.component.css'],
 
})
export class ListEnchereComponent implements OnInit {
  dataSource: MatTableDataSource<Enchere>
  displayedColumns = ['box','enchere', 'devise', 'offre', 'date', 'status','chrono','action'];
  listenchere:any[]=[]
  displayStyle = "none";
  enchere=new Enchere();

  //filter
  filterValues = {};
  filterSelectObj = [];
  
  constructor(private enchereService:EnchereService,private propositionService:PropositionService
    ,private authService:AuthService, 
    private toastr: ToastrService) {
      this.dataSource=new MatTableDataSource(this.listenchere),
      this.filterSelectObj = [
        /*{
          name: 'date',
          columnProp: 'date',
          options: []
        },*/ {
          name: 'status',
          columnProp: 'status',
          options: []
        }
      ]
    }
    

  ngOnInit(): void {
    setInterval(() => { this.GetAllEnchere()}, 1000)
    
    //this.GetAllEnchere()
    this.propositionService.GetAll().subscribe(res=>{
      console.log(res);
    },(err)=>{

      console.log(err);
    })
  }
  GetAllEnchere(){
    this.enchereService.GetEnchereNull().subscribe(data=>{this.listenchere=data
      let res:any[];
      let date:Date=new Date()
      res=this.listenchere;
      {res.map((i)=>{
        console.log(new Date(i.dateDebut))
        console.log(new Date(i.dateDebut).getTime())
        console.log(date)
        console.log(new Date(i.heureFin).getTime())
        if(new Date(i.dateDebut).getTime()<=date.getTime() && new Date(i.heureFin).getTime()>date.getTime()){
        i.chrono=this.convertMsToTime(new Date(i.heureFin).getTime()-date.getTime())
        i.status="En cours"
      }else if(new Date(i.dateDebut).getTime()<=date.getTime() && new Date(i.heureFin).getTime()<date.getTime()){
        i.chrono="00:00:00"
        i.status="clôturé"
      }
      return i;})}
      let datafinal=[]
      for(let r of res ){
        if(r.status!=null&&r.chrono!=null){
          datafinal.push(r)
        }
      }
      this.dataSource.data=datafinal
      this.getRemoteData(datafinal)
      this.dataSource.filterPredicate = this.createFilter();
      console.log(date.getTime)
      console.log(res)
    })

  }
  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  convertMsToTime(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    minutes = minutes % 60;
  
    return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}:${this.padTo2Digits(
      seconds,
    )}`;
  }

  getFilterObject(fullObj, key) {
    const uniqChk = [];
    fullObj.filter((obj) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }
  getRemoteData(data) {
  this.dataSource.data = data;

    this.filterSelectObj.filter((o) => {
      o.options = this.getFilterObject(data, o.columnProp);
    });
  }
// Called on Filter change
filterChange(filter, event) {
  //let filterValues = {}
  this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
  this.dataSource.filter = JSON.stringify(this.filterValues)
}

// Custom filter method fot Angular Material Datatable
createFilter() {
  let filterFunction = function (data: any, filter: string): boolean {
    let searchTerms = JSON.parse(filter);
    let isFilterSet = false;
    for (const col in searchTerms) {
      if (searchTerms[col].toString() !== '') {
        isFilterSet = true;
      } else {
        delete searchTerms[col];
      }
    }

    console.log(searchTerms);

    let nameSearch = () => {
      let found = false;
      if (isFilterSet) {
        for (const col in searchTerms) {
          searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
            if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
              found = true
            }
          });
        }
        return found
      } else {
        return true;
      }
    }
    return nameSearch()
  }
  return filterFunction
}

// Reset table filters
resetFilters() {
  this.filterValues = {}
  this.filterSelectObj.forEach((value, key) => {
    value.modelValue = undefined;
  })
  this.dataSource.filter = "";
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
    this.propositionService.Add(prop).subscribe(res=>{console.log(res)
      this.toastr.success('avec succès', 'Votre réponse a été envoyée!');},(err)=>{
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
 getbyindex(index){
  this.enchere=index
    /*for(let i=0; i<this.listenchere.length;i++){
      if(i==index){
        this.enchere=this.listenchere[i]
      }
    }*/
    console.log(this.enchere)
  }
  myFunction() {
    alert("I am an alert box!");
}


  
}