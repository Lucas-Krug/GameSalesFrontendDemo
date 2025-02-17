import {Component} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {GameService} from './game.service';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [NgForOf, MatPaginatorModule, NgIf, FormsModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "Game Sales";
  games: any;

  currentPage = 0;

  subscriber : any;

  enteredSearchValue: string = '';

  enteredSalesValue: string = '';

  enteredScoreValue: string = '';

  selectedDate: any = null;

  isPagingActive: boolean = true;

  isFilterExpanded: boolean = false;

  constructor(private service: GameService) {
  }

  ngOnInit() {
    this.subscriber = this.service.getGames(this.currentPage).subscribe(data => {
      this.games = data;
    });
  }

  getFilteredGames(): void {
    this.isPagingActive = false;
    this.subscriber.unsubscribe();
    this.subscriber = this.service.getFilteredGames(this.enteredSearchValue, this.enteredSalesValue, this.enteredScoreValue, this.selectedDate).subscribe(data => {
      this.games = data;
    });
  }

  nextPage() {
    this.changePage(true);
  }

  previousPage() {
    this.changePage(false);
  }

  private changePage(isNext: boolean) {
    this.isPagingActive = true;
    this.subscriber.unsubscribe();
    if(isNext) this.currentPage += 1; else this.currentPage -= 1;
    this.subscriber = this.service.getGames(this.currentPage).subscribe(data => {
      this.games = data;
    });
    window.scrollTo({ top: 0 });
  }

  toggleFilterExpanded() {
    this.isFilterExpanded = !this.isFilterExpanded;
  }
  clearDate() {
    this.selectedDate = undefined;
  }
}
