import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Achat } from '../models/Achat';
import { AchatService } from '../services/achat.service';
import { CurrencyPipe } from '@angular/common';
import {StockChart} from 'angular-highcharts';
import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-achat-dashboard',
  templateUrl: './achat-dashboard.component.html',
  styleUrls: ['./achat-dashboard.component.css']
})
export class AchatDashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Achat>
  displayedColumns = ['nomBanque', 'AED', 'EUR', 'LYD', 'BHD', 'SAR', 'CAD', 'DKK', 'USD', 'GBP', 'JPY', 'NOK', 'SEK', 'CHF', 'KWD', 'QAR', 'CNY'];
  Achats: Achat[];
  headerValue: string = "EUR";
  sortedData: Achat[];
   devise: string = 'EUR';
   today = new Date()
  position = 'left'

  maxValeurAchatJour:number
  minValeurAchatJour:number
  maxValeurAchatSemaine:any
  minValeurAchatSemaine:any
  maxValeurAchatMois:any
  minValeurAchatMois:any
  maxValeurAchatAns:any
  minValeurAchatAns:any

  symbol:any
  stock: StockChart;


  constructor(private achatService: AchatService,
    private currencyPipe: CurrencyPipe,) {
     this.dataSource = new MatTableDataSource(this.Achats)}

  ngOnInit(): void {
    this.GetAllAchat()
    this.ReaptedInstruction(this.headerValue)
  }
  GetAllAchat() {
    this.achatService.getLastAchats().subscribe((data:Achat[]) => {
      this.dataSource.data = data
      this.dataSource.sort = this.sort;
      this.Achats = data
    })
  }

  ReaptedInstruction(event){
    this.getMaxValeurJour(event)
    this.getMinValeurJour(event)
    this.getMaxValeurSemaine(event)
    this.getMinValeurSemaine(event)
    this.getMaxValeurMois(event)
    this.getMinValeurMois(event)
    this.getMaxValeurAns(event)
    this.getMinValeurAns(event)
    this.getAverge(event)
  }

  sortData(sort: Sort) {
    const data = this.Achats.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nomBanque': return this.compare(a.nomBanque, b.nomBanque, isAsc);
        case 'AED': return this.compare(a.deviseAED, b.deviseAED, isAsc);
        case 'EUR': return this.compare(a.deviseEUR, b.deviseEUR, isAsc);
        case 'LYD': return this.compare(a.deviseLYD, b.deviseLYD, isAsc);
        case 'BHD': return this.compare(a.deviseBHD, b.deviseBHD, isAsc);
        case 'SAR': return this.compare(a.deviseSAR, b.deviseSAR, isAsc);
        case 'CAD': return this.compare(a.deviseCAD, b.deviseCAD, isAsc);
        case 'DKK': return this.compare(a.deviseDKK, b.deviseDKK, isAsc);
        case 'USD': return this.compare(a.deviseUSD, b.deviseUSD, isAsc);
        case 'GBP': return this.compare(a.deviseGBP, b.deviseGBP, isAsc);
        case 'JPY': return this.compare(a.deviseJPY, b.deviseJPY, isAsc);
        case 'NOK': return this.compare(a.deviseNOK, b.deviseNOK, isAsc);
        case 'SEK': return this.compare(a.deviseSEK, b.deviseSEK, isAsc);
        case 'CHF': return this.compare(a.deviseCHF, b.deviseCHF, isAsc);
        case 'KWD': return this.compare(a.deviseKWD, b.deviseKWD, isAsc);
        case 'QAR': return this.compare(a.deviseQAR, b.deviseQAR, isAsc);
        case 'CNY': return this.compare(a.deviseCNY, b.deviseCNY, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onHeaderClicked(event: MouseEvent) {
    const headerElement = event.currentTarget as HTMLElement;
    this.headerValue = headerElement.textContent.trim();
    this.devise = this.headerValue
    this.ReaptedInstruction(this.devise)
  }

  //getmax valeur de Achat de ce jour
  getMaxValeurJour(devise){
    this.achatService.getAchatMaxJour(devise).subscribe(data=>{
  this.maxValeurAchatJour=data
  console.log("maxj", this.maxValeurAchatJour)
  this.getFormattedValueLength(this.devise)})
  }

  //get min valeur de Achat de ce jour
  getMinValeurJour(devise){
    this.achatService.getAchatMinJour(devise).subscribe(data=>{
  this.minValeurAchatJour=data})
  }

  //getmax valeur de Achat de cette Semaine
  getMaxValeurSemaine(devise){
    this.achatService.getAchatMaxSemaine(devise).subscribe(data=>{
  this.maxValeurAchatSemaine=data})
  }

  //get min valeur de Achat de cette Semaine
  getMinValeurSemaine(devise){
    this.achatService.getAchatMinSemaine(devise).subscribe(data=>{
  this.minValeurAchatSemaine=data})
  }

  //getmax valeur de Achat de ce mois
  getMaxValeurMois(devise){
    this.achatService.getAchatMaxMois(devise).subscribe(data=>{
  this.maxValeurAchatMois=data})
  }

  //get min valeur de Achat de ce mois
  getMinValeurMois(devise){
    this.achatService.getAchatMinMois(devise).subscribe(data=>{console.log("max",data)
  this.minValeurAchatMois=data})
  }

  //getmax valeur de Achat de cet année
  getMaxValeurAns(devise){
    this.achatService.getAchatMaxAns(devise).subscribe(data=>{
  this.maxValeurAchatAns=data})
  }

  //get min valeur de Achat de cet année
  getMinValeurAns(devise){
    this.achatService.getAchatMinAns(devise).subscribe(data=>{console.log("max",data)
  this.minValeurAchatAns=data})
  }

  getFormattedValueLength(devise) {
    const formattedValue = this.currencyPipe.transform(this.maxValeurAchatJour, devise, 'symbol', '1.3');
    this.symbol = formattedValue.replace(this.maxValeurAchatJour.toString(), '').trim();
    return this.symbol.length;
  }

  onChange(event){
    this.headerValue=event
    this.devise=event
    this.ReaptedInstruction(this.headerValue)
  }


getAverge(event){
  let tab:any=[]
  this.achatService.getAverageByDevise(event).subscribe(res=>{
    console.log(res)
    
    for(let r of res){
      let date = new Date(r.datedevise).getTime()
      tab.push([date,r.devise])
    }

    //ordonnées les données pour avoir une seule ligne contenue
    tab.sort((a, b) => a[0] - b[0]);

    const minValue = Math.min(...tab.map(data => data[1]));
    const maxValue = Math.max(...tab.map(data => data[1]));
    Highcharts.setOptions({
      lang: {
        months: [
          'Janvier', 'Février', 'Mars', 'Avril',
          'Mai', 'Juin', 'Juillet', 'Août',
          'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ],
        weekdays: [
          'Dimanche', 'Lundi', 'Mardi', 'Mercredi',
          'Jeudi', 'Vendredi', 'Samedi'
        ],
        shortMonths: [
          'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
          'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'
      ]
      }
    });
  this.stock = new StockChart({
    rangeSelector: {
      selected: 1,
      buttons: [{
        type: 'month',
        count: 1,
        text: '1m',
        title: 'Voir 1 mois'
    }, {
        type: 'month',
        count: 3,
        text: '3m',
        title: 'Voir 3 mois'
    }, {
        type: 'month',
        count: 6,
        text: '6m',
        title: 'Voir 6 mois'
    }, {
        type: 'ytd',
        text: 'CDA',
        title: 'Voir cumul de l`année'
    }, {
        type: 'year',
        count: 1,
        text: '1A',
        title: 'Voir 1 ans'
    }, {
        type: 'all',
        text: 'Tout',
        title: 'Voir tout'
    }]
    },
    title: {
      text: 'Historique de la moyenne des achats de '+this.headerValue
    },
    chart:{
      backgroundColor:"none",
      renderTo: 'container'
    },
    yAxis: {
      min: minValue,
      max: maxValue
    },
    xAxis: {
      type: 'datetime',
    },
    series: [{
      tooltip: {
        valueDecimals: 3
      },
      name: this.headerValue,
      type: "areaspline",
      data: tab,
      dataGrouping: {
        units: [[
        'week', // unit name
        [1] // allowed multiples
        ], [
        'month',
        [1, 2, 3, 4, 6]
        ]]
        },
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
        stops: [
            [0, 'rgba(127, 135, 231,1)'],
            [1, 'rgba(38, 41, 53, .5)']
        ]
    },
    }]
  });
})
}

}
