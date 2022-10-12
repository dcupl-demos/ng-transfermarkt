import { Component, Input, OnInit } from '@angular/core';
import { FilterItem, FilterItemEntry } from '@dcupl/common';
import { DcuplList } from '@dcupl/core';

@Component({
  selector: 'app-filter-reference',
  templateUrl: './filter-reference.component.html',
  styleUrls: ['./filter-reference.component.css'],
})
export class FilterReferenceComponent implements OnInit {
  @Input() list!: DcuplList;
  @Input() filterItem!: FilterItem;

  constructor() {}

  ngOnInit() {}

  public toggleFilterEntry(entry: FilterItemEntry) {
    if (entry.selected) {
      this.list.catalog.removeFilter({
        filterKey: this.filterItem.key,
        filterEntryKey: entry.key,
      });
    } else {
      this.list.catalog.applyReferenceFilter({
        filterKey: this.filterItem.key,
        itemKeys: [entry.key],
        mode: 'add',
      });
    }
  }
}
