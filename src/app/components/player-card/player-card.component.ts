import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/pages/page-home/page-home.component';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent implements OnInit {
  @Input() player: Player | undefined;

  constructor() {}

  ngOnInit() {}

  public getLatestValuation(player: Player | undefined) {
    if (player && player.player_valuations?.length > 0) {
      return player.player_valuations.sort(
        (a, b) => a.date?.getTime() - b.date?.getTime()
      )[0].market_value;
    }
    return NaN;
  }
  public getMinMarketValue(player: Player | undefined) {
    if (player && player.player_valuations?.length > 0) {
      return Math.min(...player.player_valuations.map((v) => v.market_value));
    }
    return NaN;
  }
  public getMaxMarketValue(player: Player | undefined) {
    if (player && player.player_valuations?.length > 0) {
      return Math.max(...player.player_valuations.map((v) => v.market_value));
    }
    return NaN;
  }
}
