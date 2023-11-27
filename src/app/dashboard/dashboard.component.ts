import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { AuthService } from '../services/auth.service';
import { Vente } from '../models/Vente';
import { VenteService } from '../vente.service';
import { chartService } from '../chart.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {StockChart} from 'angular-highcharts';
import { CurrencyPipe } from '@angular/common';
//import * as Highcharts from 'highcharts';
import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Vente>
  displayedColumns = ['nomBanque', 'AED', 'EUR', 'LYD', 'BHD', 'SAR', 'CAD', 'DKK', 'USD', 'GBP', 'JPY', 'NOK', 'SEK', 'CHF', 'KWD', 'QAR', 'CNY'];
  ventes: Vente[];
  today = new Date()
  position = 'left'

  maxValeurVenteJour:number
  minValeurVenteJour:number
  maxValeurVenteSemaine:any
  minValeurVenteSemaine:any
  maxValeurVenteMois:any
  minValeurVenteMois:any
  maxValeurVenteAns:any
  minValeurVenteAns:any

  public canvas: any;
  public ctx;
  public datasets: any;
  public dataa: any;
  public myChartData;
  dataLoaded: boolean = false;
  headerValue: string = "EUR";
  public optionsChart5: any;
  selectedCurrency: string;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  file: File;
  listexcel: any;
  sortedData: Vente[];
   devise: string = 'EUR';
  ExcelData!: Vente;
  public chartOptions: any;
  stock: StockChart;
  data: any;
  symbol:any
  constructor(private excelService: ExcelService,
    private currencyPipe: CurrencyPipe,
    private authService: AuthService,
    private VenteService: VenteService,
    private chartService: chartService,) {
    this.dataSource = new MatTableDataSource(this.ventes)
  }

  ngOnInit(): void {
    this.GetAllVente();
    this.ReaptedInstruction(this.headerValue)

  }

  GetAllVente() {
    this.VenteService.getLastVentes().subscribe((data:Vente[]) => {
      this.dataSource.data = data
      this.dataSource.sort = this.sort;
      this.ventes = data
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
    const data = this.ventes.slice();
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

  //getmax valeur de vente de ce jour
  getMaxValeurJour(devise){
    this.VenteService.getVenteMaxJour(devise).subscribe(data=>{
  this.maxValeurVenteJour=data
  this.getFormattedValueLength(this.devise)})
  }

  //get min valeur de vente de ce jour
  getMinValeurJour(devise){
    this.VenteService.getVenteMinJour(devise).subscribe(data=>{
  this.minValeurVenteJour=data})
  }

  //getmax valeur de vente de cette Semaine
  getMaxValeurSemaine(devise){
    this.VenteService.getVenteMaxSemaine(devise).subscribe(data=>{
  this.maxValeurVenteSemaine=data})
  }

  //get min valeur de vente de cette Semaine
  getMinValeurSemaine(devise){
    this.VenteService.getVenteMinSemaine(devise).subscribe(data=>{
  this.minValeurVenteSemaine=data})
  }

  //getmax valeur de vente de ce mois
  getMaxValeurMois(devise){
    this.VenteService.getVenteMaxMois(devise).subscribe(data=>{
  this.maxValeurVenteMois=data})
  }

  //get min valeur de vente de ce mois
  getMinValeurMois(devise){
    this.VenteService.getVenteMinMois(devise).subscribe(data=>{console.log("max",data)
  this.minValeurVenteMois=data})
  }

  //getmax valeur de vente de cet année
  getMaxValeurAns(devise){
    this.VenteService.getVenteMaxAns(devise).subscribe(data=>{
  this.maxValeurVenteAns=data})
  }

  //get min valeur de vente de cet année
  getMinValeurAns(devise){
    this.VenteService.getVenteMinAns(devise).subscribe(data=>{console.log("max",data)
  this.minValeurVenteAns=data})
  }

  onHeaderClicked(event: MouseEvent) {
    const headerElement = event.currentTarget as HTMLElement;
    this.headerValue = headerElement.textContent.trim();
    this.devise = this.headerValue
    this.ReaptedInstruction(this.devise)
  }

  onChange(event){
    this.headerValue=event
    this.devise=event
    this.ReaptedInstruction(this.headerValue)
  }


getAverge(event){
  let tab:any=[]
  this.VenteService.getAverageByDevise(event).subscribe(res=>{
    
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
      text: 'Historique de la moyenne de '+this.headerValue
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
getFormattedValueLength(devise) {
  const formattedValue = this.currencyPipe.transform(this.maxValeurVenteJour, devise, 'symbol', '1.3');
  this.symbol = formattedValue.replace(this.maxValeurVenteJour.toString(), '').trim();
  return this.symbol.length;
}
}