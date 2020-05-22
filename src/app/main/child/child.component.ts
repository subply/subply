import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { TempData } from "../temp-data/temp-data.model";
import { DoCheck } from "@angular/core";

@Component({
  selector: "app-child",
  template: `
    <h4>child Component</h4>
    <p>myNum: {{ myNum }}</p>
    <p>myStr: {{ myStr }}</p>
    <p>myData.id: {{ myData.id }}</p>
    <p>myData.content: {{ myData.content }}</p>
  `,
  styleUrls: ["./child.component.css"],
})
export class ChildComponent implements OnChanges, DoCheck {
  @Input() myNum: number; // 프로퍼티 바인딩 (변수명:타입)
  @Input() myStr: string; // 부모 컴포넌트가 전달한 값을 받는다
  @Input() myData: TempData;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    for (let i in changes) {
      //changes를 하나씩 proName으로 사용한다
      let change = changes[i];
      if (change.isFirstChange()) {
        console.log(`first change: ${i}`);
      } else {
        console.log(
          `prev: ${change.previousValue}, cur: ${change.currentValue}`
        );
      }
    }
  }

  ngDoCheck() {
    console.log("[ngDoCheck] 실행");
  }
}
