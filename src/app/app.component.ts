import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Manga } from '../models/manga';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private http: HttpClient) {}
  public dataSource = new MatTableDataSource(Array<Manga>());
  public displayedColumns = ['Name', 'Chapter', 'NewChapter', 'Add'];

  private sortOrder: string;
  ngOnInit() {
    this.getData();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public getData() {
    this.http
      .get<Array<Manga>>('http://api.aceipse.dk/api/Tracker')
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  public sort(sortOrder: string) {
    if (this.sortOrder === sortOrder) {
      this.sortOrder = this.sortOrder + '_desc';
    } else {
      this.sortOrder = sortOrder;
    }

    this.http
      .get<Array<Manga>>(
        `http://api.aceipse.dk/api/Tracker?sortOrder=${this.sortOrder}`
      )
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  public check(): void {
    this.http
      .post<Array<Manga>>('http://api.aceipse.dk/api/Tracker/CheckForNew', {})
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  public add(id: number) {
    this.http
      .post<Array<Manga>>(
        'http://api.aceipse.dk/api/Tracker/AddOne?id=' + id,
        {}
      )
      .subscribe(x => {
        this.http
          .get<Array<Manga>>('http://api.aceipse.dk/api/Tracker')
          .subscribe(data => {
            this.dataSource = new MatTableDataSource(data);
          });
      });
  }
}
