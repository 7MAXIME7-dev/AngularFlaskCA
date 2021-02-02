import {Component, OnInit} from '@angular/core';
import {DataService} from '../operations/data.service';
import {Montant, Operation} from '../operations/operation.model';
import {HttpClient} from '@angular/common/http';
// @ts-ignore
import {Chart} from '/node_modules/chart.js';
import {range} from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})




export class BoardComponent implements OnInit {

  public operations: Operation[] = [];
  public montants: Montant[] = [];


  myUrl = 'http://127.0.0.1:5000/board';
  myUrl2 = 'http://127.0.0.1:5000/chart';



  constructor(private dataService: DataService, private httpClient: HttpClient) {

  }

  // random number generator
  // tslint:disable-next-line:typedef
  rand(frm: number, to: number) {
    return ((Math.random() * (to - frm)) + frm);
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {

    this.dataService.getOperation().subscribe((res: Operation[]) => {
      this.operations = res;
    });
    this.dataService.getMontant().subscribe((res: Montant[]) => {
      this.montants = res;

      const myLabels: string[] = [];
      const myData: number[] = [];
      // tslint:disable-next-line:no-shadowed-variable
      this.montants.forEach((res) => {
          myLabels.push(res.key);
          myData.push(res.value);
      });
      myLabels.reverse();
      myData.reverse();

      const myData_cum: number[] = [];
      myData_cum.push(myData[0]);
      for (let i = 1; i < myData.length; i++) {
          myData_cum.push(myData[i] + myData_cum[i - 1]);
      }
      console.log(myData_cum);

      const COLORS = [];
      while (COLORS.length < 100) {
        COLORS.push(`rgb(${this.rand(0, 255)}, ${this.rand(0, 255)}, ${this.rand(0, 255)})`);
      }

      const COLORS_opacity = [];
      while (COLORS_opacity.length < 100) {
        COLORS_opacity.push(`rgb(${this.rand(0, 255)}, ${this.rand(0, 255)}, ${this.rand(0, 255)}, ${0.4})`);
      }


      const myChart = new Chart('myChart', {
        type: 'line',
        data: {
          labels: myLabels,
          datasets: [{
            label: 'Dépenses',
            data: myData,
            backgroundColor: COLORS_opacity[1],
            borderColor: COLORS,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });




      const myChart2 = new Chart('myChart2', {
        type: 'line',
        data: {
          labels: myLabels,
          datasets: [{
            label: 'Dépenses',
            data: myData_cum,
            backgroundColor: COLORS_opacity,
            borderColor: COLORS,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });

    });

  }
}
