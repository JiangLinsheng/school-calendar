import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sc-cal',
  templateUrl: './sc-cal.component.html',
  styleUrls: ['./sc-cal.component.css']
})
export class ScCalComponent implements OnInit, AfterViewInit {

  timeDataSum: Array<Array<string>> = new Array<Array<string>>();
  timeData: Array<string> = new Array<string>();
  startTimeString = '2019-8-19 0:0:0';
  sTime = Date.parse(this.startTimeString);
  startTime = new Date(this.sTime);
  endTimeString = '2020-1-12 0:0:0';
  eTime = Date.parse(this.endTimeString);
  weekNum: Array<string> = new Array();
  monthNum: Array<string> = new Array();
  dayCount = 0;
  weekCount = 0;
  whiteBlank = 0;
  startRow: any;
  endRow: any;
  rows: any;
  difRows: any;
  flag=0;

  constructor() {
    this.timeData = ['一月', '1', '2', '3', '4', '5', '6', '7', '开学周'];
    this.weekNum = ['开学周', '一', '二', '三', '四', '五', '六', '七',
      '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十'];
    this.monthNum = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    this.pushDays(this.startTime);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.find();
  }

  // 把月数、日期及周数插入数组
  pushDays(time: Date) {
    while (Date.parse(time.toString()) <= this.eTime) {
        this.timeData[0] = this.monthNum[time.getMonth()];
        if (time.getDate() === 1) {
          this.whiteBlank = (time.getDay() + 6) % 7;
          for (let i = 1; i < 8; i++) {
            if (i < this.whiteBlank + 1) {
              this.timeData[i] = '';
            } else {
              this.timeData[i] = time.getDate().toString();
              this.dayCount++;
              time.setDate(time.getDate() + 1);
              if (Date.parse(time.toString()) > this.eTime) {
                break;
              }
            }
          }
          this.timeData[8] = this.weekNum[this.weekCount];
        } else {
          for (let i = 1; i < 8; i++) {
            if (time.getDate() !== 1) {
              this.timeData[i] = time.getDate().toString();
              this.dayCount++;
              time.setDate(time.getDate() + 1);
              if (Date.parse(time.toString()) > this.eTime) {
                break;
              }
            } else {
             this.timeData[i] = '';
            }
          }
          this.timeData[8] = this.weekNum[this.weekCount];
        }
        if (this.dayCount === 7) {
          this.dayCount = 0;
          this.weekCount++;
        }
        const newTimeData: Array<string> = new Array<string>();
        Object.assign(newTimeData, this.timeData);
        this.timeDataSum.push(newTimeData);
        // this.timeDataSum[this.rowCount] = this.timeData;
        // this.rowCount++;
        // console.log(this.timeData);
        // console.log(this.timeDataSum);
    }
    // console.log(this.timeDataSum);
    // console.log(this.timeDataSum[0][0]);
  }

  // 找到相同月份的区间
  find() {
    this.rows = this.timeDataSum.length;
    for (let i = 0; i < this.rows; i++) {
      if (i >= this.rows - 1) {
        this.startRow = this.rows - 1;
      } else if (this.timeDataSum[i][0] === this.timeDataSum[i + 1][0]) {
        this.startRow = i;
        // 循环找到最后一个相同的节点
        for (let j = this.startRow; j < this.rows; j++) {
          if (j >= this.rows - 1) {
            this.endRow = this.rows - 1;
            // 执行合并方法
            this.hebingMonth(this.startRow, this.endRow);
            break;
          } else if (this.timeDataSum[j][0] !== this.timeDataSum[j + 1][0]) {
            this.endRow = j;
            i = j;
            // 执行合并方法
            this.hebingMonth(this.startRow, this.endRow);
            break;
          }
        }
      }
    }
    for (let i = 0; i < this.rows; i++) {
      if (i >= this.rows - 1) {
        this.startRow = this.rows - 1;
      } else if (this.timeDataSum[i][8] === this.timeDataSum[i + 1][8]) {
        this.startRow = i;
        // 循环找到最后一个相同的节点
        for (let j = this.startRow; j < this.rows; j++) {
          if (j >= this.rows - 1) {
            this.endRow = this.rows - 1;
            // 执行合并方法
            this.hebingWeek(this.startRow, this.endRow);
            break;
          } else if (this.timeDataSum[j][8] !== this.timeDataSum[j + 1][8]) {
            this.endRow = j;
            i = j;
            // 执行合并方法
            this.hebingWeek(this.startRow, this.endRow);
            break;
          }
        }
      }
    }
  }

  // 合并单元格
  hebingMonth(startRow, endRow) {
    // console.log(startRow, endRow);
    this.difRows = endRow - startRow;
    // console.log(this.difRows);
    let x;
    // @ts-ignore
    x = document.getElementById('myTable').tBodies[0];
    // console.log(x);
    // 合并单元格
    // console.log(x.rows[startRow].firstChild);
    x.rows[startRow].firstChild.rowSpan = this.difRows + 1;
    // x.rows[startRow].firstChild.align = 'center';
    x.rows[startRow].firstChild.style.valign = 'middle';
    if (this.flag % 2 === 1) {
      x.rows[startRow].backgroundcolor = 'yellow';
    }
    // console.log(x.rows[startRow].firstChild.getAttribute('rowSpan'));
    for (let j = startRow + 1; j <= endRow; j++) {
      let y;
      y = x.rows[j].firstChild;
      x.rows[j].removeChild(y);
      if (this.flag % 2 === 1) {
        console.log(x.rows[j]);
        x.rows[j].backgroundcolor = 'yellow';
      }
    }
    this.flag = this.flag + 1;
  }

  hebingWeek(startRow, endRow) {
    // console.log(startRow, endRow);
    this.difRows = endRow - startRow;
    // console.log(this.difRows);
    let x;
    // @ts-ignore
    x = document.getElementById('myTable').tBodies[0];
    // console.log(x);
    // 合并单元格
    // console.log(x.rows[startRow].lastChild);
    x.rows[startRow].lastChild.rowSpan = this.difRows + 1;
    // x.rows[startRow].lastChild.align = 'center';
    x.rows[startRow].lastChild.style.valign = 'middle';
    for (let j = startRow + 1; j <= endRow; j++) {
      let y;
      y = x.rows[j].lastChild;
      x.rows[j].removeChild(y);
    }
  }
}
