import { Component } from "@angular/core";
import { TempData } from "../temp-data/temp-data.model";

@Component({
  selector: "app-hook-test",
  template: `
    <h4>hook-test Component..On Change</h4>
    myNum: <input type="number" [(ngModel)]="numVal" /> <br />
    myStr: <input type="text" [(ngModel)]="strVal" /> <br />
    temp.id: <input type="number" [(ngModel)]="temp.id" /> <br />
    temp.content: <input type="text" [(ngModel)]="temp.content" /><br />

    <app-child [myNum]="numVal" [myStr]="strVal" [myData]="temp"> </app-child>
  `,
})
export class HookTestComponent {
  numVal: number;
  strVal: string;
  temp: TempData;

  constructor() {
    this.numVal = 1;
    this.strVal = "test";
    this.temp = new TempData(10, "sample data");
  }
}

//     <p>myStr: <input type="str" [(ngModel)="strVal" ] />
//     <p>temp.id: <input type="number" [(ngModel)]="temp.id" /></p>
//     <p>temp.content: <input type="text" [(ngModel)]="temp.content" /></p>
