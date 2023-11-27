import { Component, OnInit } from '@angular/core';
import { VenteService } from '../vente.service';
import { MatTableDataSource } from '@angular/material/table';
import { Vente } from '../models/Vente';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-position-change',
  templateUrl: './position-change.component.html',
  styleUrls: ['./position-change.component.css']
})
export class PositionChangeComponent implements OnInit {

  /*dataSource: MatTableDataSource<any>
  displayedColumns = ['ref', 'EUR','USD' ,'AED' , 'LYD', 'BHD', 'SAR', 'CAD', 'DKK',  'GBP', 'JPY', 'NOK', 'SEK', 'CHF', 'KWD', 'QAR', 'CNY'];*/
  ventes:any[]
  inputEur:string
  inputUsd:string
  inputGbp:string
  inputJpy:string
  inputSar:string
  inputAed:string
  inputCad:string
  inputEurToTnd:string
  inputGbpToTnd:string
  inputJpyToTnd:string
  inputSarToTnd:string
  inputAedToTnd:string
  inputCadToTnd:string
  inputUsdToTnd:string
  deviseEur=0
  deviseUsd=0
  deviseGbp=0
  deviseJpy=0
  deviseSar=0
  deviseAed=0
  deviseCad=0
  eurToTnd=0
  usdToTnd=0
  gbpToTnd=0
  jpyToTnd=0
  sarToTnd=0
  aedToTnd=0
  cadToTnd=0
  totalDevise=0
  percentEur=0
  percentUsd=0

  constructor(private venteService:VenteService) { 
    //this.dataSource = new MatTableDataSource(this.ventes)
  }

  ngOnInit(): void {
    this.getDailyAverage()
    
  }

  getDailyAverage(){
    this.venteService.getAverageDaily().subscribe(data=>{
      console.log(data)
      //this.dataSource.data = data
      this.ventes=data
    })
  }
  TransferEurToTnd(){
    this.deviseEur = this.formatInput(this.deviseEur,this.inputEur).devise
    this.inputEur = this.formatInput(this.deviseEur,this.inputEur).input
    this.eurToTnd=Math.round(this.deviseEur*this.ventes[0].deviseeur*100)/100
    this.getequilibre()
  }

  TransferUsdToTnd(){
    this.deviseUsd = this.formatInput(this.deviseUsd,this.inputUsd).devise
    this.inputUsd = this.formatInput(this.deviseUsd,this.inputUsd).input
    this.usdToTnd=Math.round(this.deviseUsd*this.ventes[0].deviseusd*100)/100
    this.getequilibre()
  }

  TransferGbpToTnd(){
    this.deviseGbp = this.formatInput(this.deviseGbp,this.inputGbp).devise
    this.inputGbp = this.formatInput(this.deviseGbp,this.inputGbp).input
    this.gbpToTnd=Math.round(this.deviseGbp*this.ventes[0].devisegbp*100)/100
    //this.getequilibre()
  }

  TransferJpyToTnd(){
    this.deviseJpy = this.formatInput(this.deviseJpy,this.inputJpy).devise
    this.inputJpy = this.formatInput(this.deviseJpy,this.inputJpy).input
    this.jpyToTnd=Math.round(this.deviseJpy*(this.ventes[0].devisejpy/1000)*100)/100
    //this.getequilibre()
  }

  TransferSarToTnd(){
    this.deviseSar = this.formatInput(this.deviseSar,this.inputSar).devise
    this.inputSar = this.formatInput(this.deviseSar,this.inputSar).input
    this.sarToTnd=Math.round(this.deviseSar*(this.ventes[0].devisesar/10)*100)/100
    //this.getequilibre()
  }

  TransferAedToTnd(){
    this.deviseAed = this.formatInput(this.deviseAed,this.inputAed).devise
    this.inputAed = this.formatInput(this.deviseAed,this.inputAed).input
    this.aedToTnd=Math.round(this.deviseAed*(this.ventes[0].deviseaed/10)*100)/100
    //this.getequilibre()
  }

  TransferCadToTnd(){
    this.deviseCad = this.formatInput(this.deviseCad,this.inputCad).devise
    this.inputCad = this.formatInput(this.deviseCad,this.inputCad).input
    this.cadToTnd=Math.round(this.deviseCad*this.ventes[0].devisecad*100)/100
    //this.getequilibre()
  }


  getequilibre(){
    this.totalDevise=this.eurToTnd+this.usdToTnd
    this.percentEur=Math.round(70*this.totalDevise/this.ventes[0].deviseeur) / 100
    this.percentUsd=Math.round(30*this.totalDevise/this.ventes[0].deviseusd) / 100
    //this.percentUsd=Math.round(this.percentUsd * 100) / 100
  }

  //changer le format des nombres de devise 
  formatInput(devise,input) :any {
    const unformattedValue = input.replace(/\./g, '');
    if (unformattedValue.length > 3) {
      const formattedValue = unformattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      input = formattedValue;
    }
    devise=Number( unformattedValue)
    return {devise:devise,input:input}
  }

  /*changer le format d'affihage du total de chaque devise en Tnd
  formatInput1(val):string{
    if (val.length > 3) {
      const formattedValue = val.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      val = formattedValue;
    }
    return val
  }*/

}
