import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) {
  }

  getGames(pageNo: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/v1/games?pageNo=${pageNo}`);
  }

  getFilteredGames(title: string, sales: string, score: string, date: Date): Observable<any> {
    let url = "http://localhost:8080/api/v1/games";
    let params = [];

    if (title != "" && title != null) {
      params.push("title=" + title);
    }
    if (sales != "" && sales != null) {
      params.push("sales=" + sales);
    }
    if (score != "" && score != null) {
      params.push("critic_score=" + score);
    }
    if (date != null) {
      params.push("release_date_after=" + date.getFullYear() + "-" + this.formatSingleDigitDate(date.getDate()) + "-" + this.formatSingleDigitDate(date.getMonth()+1));
    }
    if (params.length > 0) {
      url += "?" + params.join("&");
    }
    console.log(url);
    return this.http.get<any>(url);
  }

  private formatSingleDigitDate(date: number): string {
    if(String(date).length == 1) {
      return `0${date}`;
    } else {
      return date.toString();
    }
  }
}
