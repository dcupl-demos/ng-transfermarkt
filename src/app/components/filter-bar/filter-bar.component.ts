import { Component, Input, OnInit } from '@angular/core';
import { FilterItem } from '@dcupl/common';
import { DcuplList } from '@dcupl/core';
import { DcuplService } from 'src/app/services/dcupl.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit {
  @Input() filterItems: FilterItem[] = [];

  @Input() list!: DcuplList;

  public expandedItems: Set<number> = new Set();

  constructor(public dcuplService: DcuplService) {}

  ngOnInit() {}

  public isExpanded(idx: number) {
    return this.expandedItems.has(idx);
  }

  public toggle(idx: number) {
    if (this.expandedItems.has(idx)) {
      this.expandedItems.delete(idx);
    } else {
      this.expandedItems.add(idx);
    }
  }

  public trackByKey(idx: number, item: FilterItem) {
    return item.key;
  }
}
