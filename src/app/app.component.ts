import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private http: HttpClient){}
  public mangas: Array<any>;

  public getData(){
    this.http.get('http://localhost:64472/api/Tracker').subscribe((data)=>{
      this.mangas = <Array<any>> data;
    });
  }
}
