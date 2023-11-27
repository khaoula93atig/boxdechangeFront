//import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Enchere } from '../models/Enchere';
import { AuthService } from '../services/auth.service';
import { EnchereService } from '../services/enchere.service';
import { PropositionService } from '../services/proposition.service';
//import { MatSort, Sort } from '@angular/material/sort';
//import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { TokenStorageService } from '../services/token-storage.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-proposition-list',
  templateUrl: './proposition-list.component.html',
  styleUrls: ['./proposition-list.component.css']
})
export class PropositionListComponent implements OnInit {
  dataSource: MatTableDataSource<Enchere>
  displayedColumns = ["Reference", "Devise","Montant","Date","action"]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  listenchere:any[]=[]
  displayStyle = "none";
  enchere=new Enchere();
  userId:number;
  propositionsForSelectedEnchere : any[]=[];

  constructor(private enchereService:EnchereService,
    private propositionService:PropositionService,
    private authService:AuthService,
    private tokenStorage: TokenStorageService,
    ) {this.dataSource = new MatTableDataSource(this.listenchere) }

  ngOnInit(): void {
    this.userId=this.tokenStorage.getUser().id
    this.GetAllEnchere()
    this.sort = new MatSort();
    this.propositionService.GetAll().subscribe(res=>{
      console.log(res);
    },(err)=>{

      console.log(err);
    })
  }
  GetAllEnchere(){
    this.enchereService.GetEncherByUser(this.userId).subscribe(res=>{
      console.log("mes encheres",res)
      this.dataSource.data = res
      this.dataSource.paginator=this.paginator
      this.dataSource.paginator._intl.itemsPerPageLabel='Eléments par page'
      this.dataSource.paginator._intl.getRangeLabel=this.francaisRangeLabel
      //this.listenchere=res
    })

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
 
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  getPropositionsByEnchere(enchere) {
    let latestPropositions = [];
    this.propositionService.getByEnchereId(enchere).subscribe((res: any[]) => {
      console.log("prop",res)
      this.propositionsForSelectedEnchere = res
    });
  }

  //traduction de pagination 
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
  

}
