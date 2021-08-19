import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coin } from './model/coin.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  coins : Coin[] = [];
  resultCoins :Coin[] = [];
  titles :string[] = [
    '#',
    'Coin',
    'Price',
    'Price change',
    '24h Volume',
  ]
  url : string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  searchText :string = "";

  constructor(private http :HttpClient){}

  searchCoin() {
    this.resultCoins = this.coins.filter(
      (coin) => coin.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  ngOnInit() {
    this.http.get<Coin[]>(this.url)
    .subscribe(
      (res) => {
        console.log(res)
        this.coins = res;
        this.resultCoins = res;
      },
      (err) => {}
    )
  }
}
