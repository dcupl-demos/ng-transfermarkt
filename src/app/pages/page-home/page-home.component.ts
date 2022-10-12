import { Component, OnInit } from '@angular/core';
import { DcuplService } from 'src/app/services/dcupl.service';
import { DcuplList } from '@dcupl/core';
import {
  FilterItem,
  ListMetadata,
  NumberAggregation,
  SortingProjection,
} from '@dcupl/common';
import { debounceTime, filter, startWith } from 'rxjs';

export type Foot = {
  key: string;
};
export type Position = {
  key: string;
};
export type Club = {
  key: string;
  pretty_name: string;
  stadium_name: string;
  stadium_seats: string;
};

export type Valuation = {
  key: string;
  player_id: Player;
  date: Date;
  market_value: number;
};
export type Player = {
  key: string;
  current_club_id?: Club;
  foot?: Foot;
  player_valuations: Valuation[];
  pretty_name: string;
  image_url: string;
  position?: Position;
  all_market_values: number[];
  market_value_in_gbp: number;
  currentClubName: string;
  country_of_citizenship: string;
  date_of_birth: string;
  height_in_cm: string;
};

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
})
export class PageHomeComponent implements OnInit {
  public playersList!: DcuplList<Player>;
  public players: Player[] = [];
  public filterItems: FilterItem[] = [];
  public meta!: ListMetadata;

  public aggregate!: NumberAggregation;

  public sorting: SortingProjection<Player> = {
    attributes: [],
    order: [],
  };

  public itemCount = 20;
  public itemStart = 0;

  public displayMode: 'table' | 'grid' = 'table';

  constructor(private dcuplService: DcuplService) {}

  ngOnInit() {
    this.init();
  }

  private init() {
    this.playersList = this.dcuplService.dcupl.getList({ listKey: 'players' })!;

    this.playersList
      .on$()
      .pipe(
        startWith({ action: 'update' }),
        filter((msg) => msg.action === 'update'),
        debounceTime(30)
      )
      .subscribe(() => {
        console.time('get data');
        this.getData();
        console.timeEnd('get data');
      });
  }

  private getData() {
    console.time('getItems');
    this.players = this.playersList?.catalog.getItems({
      start: this.itemStart,
      count: this.itemCount,
      sort: this.sorting,
      projection: {
        $: true,
        current_club_id: { $: true },
        player_valuations: { $: true },
      },
    });
    console.timeEnd('getItems');

    this.meta = this.playersList.catalog.getMetadata();
    console.time('getFilters');
    this.filterItems = this.playersList.catalog.getFilters();
    console.timeEnd('getFilters');

    console.time('getAggregates');
    this.aggregate = this.playersList.catalog.getAggregates({
      attributeKeys: ['market_value_in_gbp'],
    })[0] as NumberAggregation;
    console.timeEnd('getAggregates');

    console.groupCollapsed('getData');
    console.log(this.players);
    console.log(this.meta);
    console.log(this.filterItems);
    console.log(this.aggregate);
    console.groupEnd();
  }

  public itemCountChanged(event: any) {
    const value = event.target.value;

    this.itemCount = parseInt(value);
    this.itemStart = 0;
    console.log(this.itemCount);
    this.getData();
  }
  public sortChanged(event: any) {
    const value = event.target.value;

    if (value === 'pretty_name') {
      this.sorting = {
        attributes: ['pretty_name'],
        order: ['ASC'],
      };
    } else if (value === 'market_value_in_gbp') {
      this.sorting = {
        attributes: ['market_value_in_gbp'],
        order: ['DESC'],
      };
    } else {
      this.sorting = {
        attributes: [],
        order: [],
      };
    }
    this.getData();
  }

  public toggleDisplay() {
    if (this.displayMode === 'grid') {
      this.displayMode = 'table';
    } else {
      this.displayMode = 'grid';
    }
  }
}
