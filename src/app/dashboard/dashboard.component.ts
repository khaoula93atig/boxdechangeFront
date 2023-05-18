import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ExcelService } from '../services/excel.service';
import { AuthService } from '../services/auth.service';
import { Vente } from '../models/Vente';

//import * as Highcharts from 'highcharts';
import { VenteService } from '../vente.service';
import { Observable } from 'rxjs/internal/Observable';
import * as Chart from 'chart.js';
import { chartService } from '../chart.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CloseScrollStrategy } from '@angular/cdk/overlay';




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
  filteredData: Vente;
  filteredDataMIN: Vente;
  filteredDataMONTH: Vente;
  filteredDataMINMONTH: Vente;
  filteredDataYEAR: Vente;
  filteredDataMINYEAR: Vente;
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
  constructor(private excelService: ExcelService,
    private authService: AuthService,
    private VenteService: VenteService,
    private chartService: chartService) {
    this.dataSource = new MatTableDataSource(this.ventes)

  }

  chart: Chart;
  data: any;
  handleItemClick(item: string) {
    // Clear the previous chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }
  
    // Update the data for the chart based on the item clicked
   // const newData = /* get data for the chart based on the item clicked */;
   this.chartService.getAllAverages().subscribe(data => {

    this.data = data;
    this.dataLoaded = true;
console.log(this.data)
   // this.createChart();
  });
  
    // Create the new chart with the updated data
    this.createChart();
  }
  
  createChart() {
    console.log('chart data', this.data);
    if (this.dataLoaded) {
      this.chart = new Chart("MyChart1", {
        type: 'line', //this denotes tha type of chart
  
        data: this.data,
  
        options: {
          onClick: (event, elements) => {
            /*  if (elements.length > 0) {
                const index = elements[0].index;
                const value = chartData.datasets[0].data[index];
                alert(`You clicked on ${chartData.labels[index]} with a value of ${value}.`);
              }
             */
            
            console.log(this.chart.data.datasets)
            },
          scales: {
            yAxes: [{
              gridLines: {
                color: 'rgba(255, 255, 255, 0.1)' // change the color of the y-axis grid lines
              }
            }],
            xAxes: [{
              gridLines: {
                color: 'rgba(255, 255, 255, 0.1)' // change the color of the x-axis grid lines
              }
            }]
          },
          legend: {
            labels: {
              fontColor: '#e6e6e6' // change the color of the legend labels
            }
          },
        }
      });
  
      // Set the colors for the chart data
      this.chart.data.datasets.forEach((dataset, index) => {
        dataset.borderColor = ['#3366CC',
          '#DC3912',
          '#FF9900',
          '#109618',
          '#990099',
          '#3B3EAC',
          '#0099C6',
          '#DD4477',
          '#66AA00',
          '#B82E2E',
          '#316395',
          '#994499',
          '#22AA99',
          '#AAAA11',
          '#6633CC',
          '#E67300'][index];
        dataset.backgroundColor = `rgba(0, 0, 0, 1)`;
        dataset.borderWidth = 1;
      });
    }
  }
  
  ngOnInit(): void {
    this.chartService.getAllAverages().subscribe(data => {

      this.data = data;
      this.dataLoaded = true;

      this.createChart();
    });


    this.GetAllVente();




    this.getexcelfile();

    this.VenteService.getMAX(this.headerValue).subscribe(
      data => {
        this.filteredData = data;
        //console.log(this.filteredData); 
      }
    );
  
    this.VenteService.getMIN(this.headerValue).subscribe(
      data => {
        this.filteredDataMIN = data;
        //console.log(this.filteredData); 
      }
    );
  
    this.VenteService.getMAXDATE(this.headerValue, "year").subscribe(
      data => {
        this.filteredDataYEAR = data;
        //console.log(this.filteredData); 
      }
    );
  
    this.VenteService.getMINDATE(this.headerValue, "year").subscribe(
      data => {
        this.filteredDataMINYEAR = data;
        //console.log(this.filteredData); 
      }
    );
  
    this.VenteService.getMAXDATE(this.headerValue, "month").subscribe(
      data => {
        this.filteredDataMONTH = data;
        //console.log(this.filteredData); 
      }
    );
  
    
  
    this.VenteService.getMINDATE(this.headerValue, "month").subscribe(
      data => {
        this.filteredDataMINMONTH = data;
        //console.log(this.filteredData); 
      }
    );

  }

  GetAllVente() {
    this.VenteService.getAllVentes().subscribe((data:Vente[]) => {
      console.log(data)
     
      /*this.ventes=data
      for(let v of this.ventes){
        if(v.deviseAED=='0'){
          v.deviseAED='--'
        }
        if(v.deviseEUR=='0'){
          v.deviseEUR='--'
        }
        if(v.deviseLYD=='0'){
          v.deviseLYD='--'
        }
      }*/
      this.dataSource.data = data
      this.dataSource.sort = this.sort;

      console.dir(this.sort)
      this.ventes = data
      console.log(this.dataSource)
    })
    /*this.authService.decodeToken().subscribe(res=>{
      this.authService.getUserDataByUserName(res["sub"]).subscribe(res=>{
        
    })*/
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








  public updateOptions() {
    this.myChartData.data.datasets[0].dataa = this.dataa;
    this.myChartData.update();
  }
  getexcelfile() {

    this.excelService.getExcelFile().subscribe((data: any[]) => {
      this.listexcel = data
      console.log(this.listexcel);
    })

  }

  getMaxValue(): string {
    if (this.headerValue == "") return "select a header"
    return this.filteredData["devise" + this.headerValue]
  }
  getMINValue(): string {
    if (this.headerValue == "") return "select a header"
    return this.filteredDataMIN["devise" + this.headerValue]
  }

  getMaxValuemonth(): string {
    if (this.headerValue == "") return "select a header"
    return this.filteredDataMONTH["devise" + this.headerValue]
  }
  getMINValuemonth(): string {
    if (this.headerValue == "") return "select a header"
    return this.filteredDataMINMONTH["devise" + this.headerValue]
  }

  getMaxValueyear(): string {
    if (this.headerValue == "") return "select a header"
    return this.filteredDataYEAR["devise" + this.headerValue]
  }
  getMINValueyear(): string {
    if (this.headerValue == "") return "select a header"
    return this.filteredDataMINYEAR["devise" + this.headerValue]
  }
  processExcel(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(reader.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      this.data = XLSX.utils.sheet_to_json(worksheet, { raw: true });
    }

    reader.readAsArrayBuffer(file);

  }

  onHeaderClicked(event: MouseEvent) {
    const headerElement = event.currentTarget as HTMLElement;
    this.headerValue = headerElement.textContent.trim();
    this.devise = this.headerValue
    console.log(this.headerValue)
    this.VenteService.getMAX(this.headerValue).subscribe(
      data => {
        this.filteredData = data;
        //console.log(this.filteredData); 
      }
    );

    this.VenteService.getMIN(this.headerValue).subscribe(
      data => {
        this.filteredDataMIN = data;
        //console.log(this.filteredData); 
      }
    );

    this.VenteService.getMAXDATE(this.headerValue, "year").subscribe(
      data => {
        this.filteredDataYEAR = data;
        //console.log(this.filteredData); 
      }
    );

    this.VenteService.getMINDATE(this.headerValue, "year").subscribe(
      data => {
        this.filteredDataMINYEAR = data;
        //console.log(this.filteredData); 
      }
    );

    this.VenteService.getMAXDATE(this.headerValue, "month").subscribe(
      data => {
        this.filteredDataMONTH = data;
        //console.log(this.filteredData); 
      }
    );

    this.VenteService.getMINDATE(this.headerValue, "month").subscribe(
      data => {
        this.filteredDataMINMONTH = data;
        //console.log(this.filteredData); 
      }
    );
  }

}