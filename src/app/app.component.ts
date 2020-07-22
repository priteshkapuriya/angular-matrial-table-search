import { Component, ViewChild, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { DataService } from "./data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "black-hawk-test";
  dataResult;

  constructor(private dataService: DataService) {}

  displayedColumns: string[] = ["name", "email", "phone", "country"];
  dataSource;
  results = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataService.sendGetRequest().subscribe((data: any[]) => {
      this.dataResult = data;
      //console.log(this.dataResult);
      this.dataResult.results.forEach((element) => {
        const objElem = this.fillObject(element);
        this.results.push(objElem);
      });
      this.dataSource = new MatTableDataSource(this.results);
      this.dataSource.paginator = this.paginator;
    });
  }

  onKey(event: any) {
    // without type info
    const value = event.target.value;
    this.results = [];
    this.dataResult.results.forEach((element) => {
      if (element.name.first.includes(value)) {
        const objElem = this.fillObject(element);
        this.results.push(objElem);
      }
    });
    this.dataSource = new MatTableDataSource(this.results);
    this.dataSource.paginator = this.paginator;
  }

  fillObject(element) {
    var obj = {
      name: element.name.first,
      email: element.email,
      phone: element.phone,
      country: element.location.country,
    };
    return obj;
  }
}
