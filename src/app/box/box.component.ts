import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Box } from '../models/Box';
import { BoxService } from '../services/box.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Box>
  displayedColumns = ['id','nom', 'adresse', 'telephoneBox', 'responsable', 'email','telephoneResponsable','contrat','dateContrat','status','action'];
  listeBox:Box[]=[]
  displayStyle = "none"
  displayStyle1 = "none"
  boxUpadate=new Box()
  box=new Box()
  selected=false
  
  francaisRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) { return `0 de ${length}`; }
    
    length = Math.max(length, 0);
  
    const startIndex = page * pageSize;
  
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
  
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  }


  constructor(private boxService:BoxService,
    private toastr: ToastrService) { 
    this.dataSource=new MatTableDataSource(this.listeBox)
     }

  ngOnInit(): void {
    this.getAllBox()
  }
  getAllBox(){
    this.boxService.GetAllBox().subscribe(res=>{
      console.log(res)
      this.dataSource.data=res
      this.dataSource.paginator=this.paginator
      this.dataSource.paginator._intl.itemsPerPageLabel='Eléments par page'
      this.dataSource.paginator._intl.getRangeLabel=this.francaisRangeLabel
    })
  }

  openDialogueAjout(){
    this.displayStyle = "block"
  }

  openDialogueModifier(){
    this.displayStyle1 = "block"
  }
  closeDialogueAjout(){
    this.displayStyle = "none"
  }

  closeDialogueModifier(){
    this.displayStyle1 = "none"
  }

  //ajout box
  ajoutBox(){
    console.log(this.box)
    this.boxService.AjoutBox(this.box).subscribe(res=>{console.log(res)
      if(res['response']=="OK"){
        this.toastr.success('avec succès', 'Box est ajouté!');
        this.box=new Box()
        this.ngOnInit()
      }
      else{
        this.toastr.error('error', 'un erreur est servenue!');
      }
    })
  }

  //modifier box
  getBox(event){
    console.log(event)
    this.boxUpadate=event
    if(this.boxUpadate.status=="active"){
      this.selected=true
    }
  }
  modifierBox(){
    if(this.selected==false){
      this.boxUpadate.status="désactive"
    }
    console.log(this.boxUpadate)
    this.boxService.ModifierBox(this.boxUpadate.idbox,this.boxUpadate).subscribe(res=>{console.log(res)
      if(res['response']=="OK"){
        this.toastr.success('avec succès', 'Box est modifié!');
        this.boxUpadate=new Box()
        this.ngOnInit()
      }
      else{
        this.toastr.error('error', 'un erreur est servenue!');
      }
    })

  }

  clickButton($event) {
    this.selected = !this.selected;
    console.log(this.selected)
  }

 

}
