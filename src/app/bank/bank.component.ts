import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Bank } from '../models/Bank';
import { BankService } from '../services/bank.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Bank>
  displayedColumns = ['id','nom', 'telephone','email'];
  listeBank:Bank[]=[]
  displayStyle = "none"
  bank=new Bank()

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


  constructor(private bankService:BankService,
    private toastr: ToastrService) {
      this.dataSource=new MatTableDataSource(this.listeBank)
     }

  ngOnInit(): void {
    this.getAll()
  }

  //list bank
  getAll(){
    this.bankService.GetAllBank().subscribe(res=>{
      this.dataSource.data=res
      this.dataSource.paginator=this.paginator
      this.dataSource.paginator._intl.itemsPerPageLabel='Eléments par page'
      this.dataSource.paginator._intl.getRangeLabel=this.francaisRangeLabel
    })
  }

  openDialogueAjout(){
    this.displayStyle = "block"
  }

  closeDialogueAjout(){
    this.displayStyle = "none"
  }

  //ajout Bank
  ajoutBank(){
    this.bankService.AjoutBank(this.bank).subscribe(res=>{
      if(res['response']=="OK"){
        this.toastr.success('avec succès', 'Bank est ajouté!');
        this.bank=new Bank()
        this.ngOnInit()
      }
      else{
        this.toastr.error('error', 'un erreur est servenue!');
      }
    })
  }


}
