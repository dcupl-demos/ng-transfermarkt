import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/pages/page-home/page-home.component';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css'],
})
export class PlayerTableComponent implements OnInit {
  @Input() players: Player[] = [];

  constructor() {}

  ngOnInit() {}
}
