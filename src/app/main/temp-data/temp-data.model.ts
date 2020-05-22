export class TempData {
  id: number;
  content: string;
  subData: SubObj;

  constructor(_id: number, _content: string) {
    this.id = _id;
    this.content = _content;
    this.subData = new SubObj(this.id + 100, "data...");
  }
}

export class SubObj {
  data1: number;
  data2: string;

  constructor(d1: number, d2: string) {
    this.data1 = d1;
    this.data2 = d2;
  }
}
