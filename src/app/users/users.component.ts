import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  @ViewChild(MatPaginator) paginator3: MatPaginator;
  dataBox: MatTableDataSource<User>
  dataBank: MatTableDataSource<User>
  dataAdmin: MatTableDataSource<User>
  columnBox = ['id','nom', 'userName', 'email', 'telephone', 'box'];
  columnBank = ['id','nom', 'userName', 'email', 'telephone', 'bank'];
  columnAdmin = ['id','nom', 'userName', 'email', 'telephone'];
  liste:any[]=[]

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

  constructor(private userService:UserService) {
    this.dataBox=new MatTableDataSource(this.liste)
    this.dataBank=new MatTableDataSource(this.liste)
    this.dataAdmin=new MatTableDataSource(this.liste)
   }

  ngOnInit(): void {
    this.getUserByRole("ROLE_ENCHERE",this.dataBox, this.paginator)
  }

  getUserByRole(role,list , pag){
    list.data =[]
    this.userService.getByRole(role).subscribe(res=>{console.log(res)
      list.data=res
      list.paginator=pag
      list.paginator._intl.itemsPerPageLabel='Eléments par page'
     list.paginator._intl.getRangeLabel=this.francaisRangeLabel

    })
  }

 /* getUserByRole1(role){
    this.dataBank.data =[]
    this.userService.getByRole(role).subscribe(res=>{console.log(res)
      for(let r of res){
        delete r.box
      }
      this.dataBank.data=res
      this.dataBank.paginator=this.paginator
      this.dataBank.paginator._intl.itemsPerPageLabel='Eléments par page'
      this.dataBank.paginator._intl.getRangeLabel=this.francaisRangeLabel

    })
  }*/

}
