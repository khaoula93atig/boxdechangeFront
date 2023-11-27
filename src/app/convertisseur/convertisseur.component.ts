import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VenteService } from '../vente.service';
import { CurrencyPipe } from '@angular/common';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-convertisseur',
  templateUrl: './convertisseur.component.html',
  styleUrls: ['./convertisseur.component.css']
})
export class ConvertisseurComponent implements OnInit {
  @ViewChild('montantInput') montantInput: ElementRef;
  
  currencies: any[] = [
    { code: 'TND', name: 'Dinar Tunisian', flag: 'tn' },
    { code: 'EUR', name: 'Euro', flag: 'eu' },
    { code: 'USD', name: 'Dollar Américain', flag: 'us' },
    { code: 'AED', name: 'Dirham des Emirats Arabes Unis', flag: 'ae' },
    { code: 'BHD', name: 'Dinar Bahreini', flag: 'bh' },
    { code: 'CAD', name: 'Dollar Canadien', flag: 'ca' },
    { code: 'CHF', name: 'Fran Suisse', flag: 'ch' },
    { code: 'CNY', name: 'Yuan Chinois', flag: 'cn' },
    { code: 'DKK', name: 'Couronne Danoise', flag: 'dk' },
    { code: 'GBP', name: 'Livre Sterling', flag: 'gb' },
    { code: 'JPY', name: 'Yen Japonais', flag: 'jp' },
    { code: 'KWD', name: 'Dinar Koweitien', flag: 'kw' },
    { code: 'LYD', name: 'Dinar Libyen', flag: 'ly' },
    { code: 'NOK', name: 'Couronne Norvégienne', flag: 'no' },
    { code: 'QAR', name: 'Riyal Qatari', flag: 'qa' },
    { code: 'SAR', name: 'Riyal Saoudien', flag: 'sa' },
    { code: 'SEK', name: 'Couronne Suedoise', flag: 'se' }
  ];


  deviseAconvertir:string="EUR"
  deviseAconvertirEn:string="TND"
  montant:any=1
  deviseEnlettreAconvertir="EURO"
  deviseEnlettreAconvertirEn="DINAR TUNISIEN"
  montantConvertis=0
  valeursDevise:any[]=[]
  symbol:any
  standarTnd=0
  standardDevise=0


  constructor(private avgService:VenteService,
    private currencyPipe: CurrencyPipe) { }


  ngOnInit(): void {
    this.getAvgVente()
  }

  getAvgVente(){
    this.avgService.getAverageDaily().subscribe(data=>{console.log(data)
      this.valeursDevise=data
    })
  }
  getNomDevise(event,devise){
    if(event=="EUR"){
      devise="EURO"
      console.log(this.deviseEnlettreAconvertir)
    }

  }

  onCurrencySelect(currencyCode: string): void {
    if(currencyCode!="TND"){
    const result = this.currencies.find( ({ code }) => code === currencyCode );
    this.deviseAconvertir = currencyCode;
    this.deviseAconvertirEn="TND"
    this.deviseEnlettreAconvertir=result.name
    this.deviseEnlettreAconvertirEn="DINAR TUNISIEN"
    this.convert()
    }
  }

  onCurrencySelect1(currencyCode: string): void {
    if(currencyCode!="TND"){
    this.deviseAconvertirEn = currencyCode;
    this.deviseAconvertir="TND"
    const result = this.currencies.find( ({ code }) => code === currencyCode );
    this.deviseEnlettreAconvertirEn=result.name
    this.deviseEnlettreAconvertir="DINAR TUNISIEN"
    this.convert()
    }
  }

  changeDevise(){
    var change = this.deviseAconvertir
    this.deviseAconvertir=this.deviseAconvertirEn
    this.deviseAconvertirEn=change
    const result = this.currencies.find( ({ code }) => code === this.deviseAconvertirEn );
    const result1 = this.currencies.find( ({ code }) => code === this.deviseAconvertir );
    this.deviseEnlettreAconvertir=result1.name
    this.deviseEnlettreAconvertirEn=result.name
    console.log(result)
  }

  convert(){
    //this.montantInput.nativeElement;
    this.montantConvertis=0
    if(this.deviseAconvertirEn=="TND"){
    switch(this.deviseAconvertir){
        case "EUR":
          this.montantConvertis=this.valeursDevise[0].deviseeur*this.montant
          this.standardDevise=this.valeursDevise[0].deviseeur
          this.standarTnd=1/this.valeursDevise[0].deviseeur
          break;
        case "USD":
          this.montantConvertis=this.valeursDevise[0].deviseusd*this.montant
          this.standardDevise=this.valeursDevise[0].deviseusd
          this.standarTnd=1/this.valeursDevise[0].deviseusd
          break;
        case "AED":
          this.montantConvertis=(this.valeursDevise[0].deviseaed/10)*this.montant  
          this.standardDevise=this.valeursDevise[0].deviseaed/10
          this.standarTnd=10/this.valeursDevise[0].deviseaed
          break;
        case "BHD":
          this.montantConvertis=this.valeursDevise[0].devisebhd*this.montant
          this.standardDevise=this.valeursDevise[0].devisebhd
          this.standarTnd=1/this.valeursDevise[0].devisebhd
          break;
        case "CAD":
          this.montantConvertis=this.valeursDevise[0].devisecad*this.montant
          this.standardDevise=this.valeursDevise[0].devisecad
          this.standarTnd=1/this.valeursDevise[0].devisecad
          break;
        case "CHF":
          this.montantConvertis=(this.valeursDevise[0].devisechf/10)*this.montant
          this.standardDevise=this.valeursDevise[0].devisechf/10
          this.standarTnd=10/this.valeursDevise[0].devisechf
          break;
        case "DKK":
          this.montantConvertis=(this.valeursDevise[0].devisedkk/100)*this.montant
          this.standardDevise=this.valeursDevise[0].devisedkk/100
          this.standarTnd=100/this.valeursDevise[0].devisedkk
          break;
        case "GBP":
          this.montantConvertis=this.valeursDevise[0].devisegbp*this.montant
          this.standardDevise=this.valeursDevise[0].devisegbp
          this.standarTnd=1/this.valeursDevise[0].devisegbp
          break;
        case "JPY":
          this.montantConvertis=(this.valeursDevise[0].devisejpy/1000)*this.montant
          this.standardDevise=this.valeursDevise[0].devisejpy/1000
          this.standarTnd=1000/this.valeursDevise[0].devisejpy
          break;
        case "KWD":
          this.montantConvertis=this.valeursDevise[0].devisekwd*this.montant
          this.standardDevise=this.valeursDevise[0].devisekwd
          this.standarTnd=1/this.valeursDevise[0].devisekwd
          break;
        case "LYD":
          this.montantConvertis=this.valeursDevise[0].deviselyd*this.montant
          this.standardDevise=this.valeursDevise[0].deviselyd
          this.standarTnd=1/this.valeursDevise[0].deviselyd
          break;
        case "NOK":
          this.montantConvertis=(this.valeursDevise[0].devisenok/100)*this.montant
          this.standardDevise=this.valeursDevise[0].devisenok/100
          this.standarTnd=100/this.valeursDevise[0].devisenok
          break;
        case "QAR":
          this.montantConvertis=(this.valeursDevise[0].deviseqar/10)*this.montant
          this.standardDevise=this.valeursDevise[0].deviseqar/10
          this.standarTnd=10/this.valeursDevise[0].deviseqar
          break;
        case "SAR":
          this.montantConvertis=(this.valeursDevise[0].devisesar/10)*this.montant
          this.standardDevise=this.valeursDevise[0].devisesar/10
          this.standarTnd=10/this.valeursDevise[0].devisesar
          break;
        case "SEK":
          this.montantConvertis=(this.valeursDevise[0].devisesek/10)*this.montant
          this.standardDevise=this.valeursDevise[0].devisesek/10
          this.standarTnd=10/this.valeursDevise[0].devisesak
          break;

    }
  }
  if(this.deviseAconvertir=="TND"){
    switch(this.deviseAconvertirEn){
      case "EUR":
        this.montantConvertis=this.montant/this.valeursDevise[0].deviseeur
        this.standarTnd=this.valeursDevise[0].deviseeur
        this.standardDevise=1/this.valeursDevise[0].deviseeur
        break;
      case "USD":
        this.montantConvertis=this.montant/this.valeursDevise[0].deviseusd
        this.standarTnd=this.valeursDevise[0].deviseusd
        this.standardDevise=1/this.valeursDevise[0].deviseusd
        break;
      case "AED":
        this.montantConvertis=this.montant/(this.valeursDevise[0].deviseaed*10)
        this.standarTnd=this.valeursDevise[0].deviseaed/10
        this.standardDevise=10/this.valeursDevise[0].deviseaed
        break;
      case "BHD":
        this.montantConvertis=this.montant/this.valeursDevise[0].devisebhd
        this.standarTnd=this.valeursDevise[0].deviseeur
        this.standardDevise=1/this.valeursDevise[0].deviseeur
        break;
      case "CAD":
        this.montantConvertis=this.montant/this.valeursDevise[0].devisecad
        this.standarTnd=this.valeursDevise[0].devisecad
        this.standardDevise=1/this.valeursDevise[0].devisecad
        break;
      case "CHF":
        this.montantConvertis=this.montant/(this.valeursDevise[0].devisechf*10)
        this.standarTnd=this.valeursDevise[0].devisechf/10
        this.standardDevise=10/this.valeursDevise[0].devisechf
        break;
      case "DKK":
        this.montantConvertis=this.montant/(this.valeursDevise[0].devisedkk*100)
        this.standarTnd=this.valeursDevise[0].devisechf/100
        this.standardDevise=100/this.valeursDevise[0].devisechf
        break;
      case "GBP":
        this.montantConvertis=this.montant/this.valeursDevise[0].devisegbp
        this.standarTnd=this.valeursDevise[0].devisegbp
        this.standardDevise=1/this.valeursDevise[0].devisegbp
        break;
      case "JPY":
        this.montantConvertis=this.montant/(this.valeursDevise[0].devisejpy*1000)
        this.standarTnd=this.valeursDevise[0].devisejpy
        this.standardDevise=1000/this.valeursDevise[0].devisejpy
        break;
      case "KWD":
        this.montantConvertis=this.montant/this.valeursDevise[0].devisekwd
        this.standarTnd=this.valeursDevise[0].devisekwd
        this.standardDevise=1/this.valeursDevise[0].devisekwd
        break;
      case "LYD":
        this.montantConvertis=this.montant/this.valeursDevise[0].deviselyd
        this.standarTnd=this.valeursDevise[0].deviselyd
        this.standardDevise=1/this.valeursDevise[0].deviselyd
        break;
      case "NOK":
        this.montantConvertis=this.montant/(this.valeursDevise[0].devisenok*100)
        this.standarTnd=this.valeursDevise[0].devisenok/100
        this.standardDevise=100/this.valeursDevise[0].devisenok
        break;
      case "QAR":
        this.montantConvertis=this.montant/(this.valeursDevise[0].deviseqar*10)
        this.standarTnd=this.valeursDevise[0].deviseqar/10
        this.standardDevise=10/this.valeursDevise[0].deviseqar
        break;
      case "SAR":
        this.montantConvertis=this.montant/(this.valeursDevise[0].devisesar*10)
        this.standarTnd=this.valeursDevise[0].devisesar/10
        this.standardDevise=10/this.valeursDevise[0].devisesar
        break;
      case "SEK":
        this.montantConvertis=this.montant/(this.valeursDevise[0].devisesek*10)
        this.standarTnd=this.valeursDevise[0].devisesek
        this.standardDevise=10/this.valeursDevise[0].devisesek
        break;


    }
  }

  }
  updateUSAmount(event) {
    this.montant = event.target.value;
  }
  
}
