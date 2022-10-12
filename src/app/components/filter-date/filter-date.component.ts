import { Component, Input, OnInit } from '@angular/core';
import { FilterItem } from '@dcupl/common';
import { DcuplList } from '@dcupl/core';

@Component({
  selector: 'app-filter-date',
  templateUrl: './filter-date.component.html',
  styleUrls: ['./filter-date.component.css'],
})
export class FilterDateComponent implements OnInit {
  @Input() list!: DcuplList;
  @Input() filterItem!: FilterItem;

  constructor() {}

  ngOnInit() {}

  public applyDateFilter(input: HTMLInputElement, filterItem: FilterItem) {
    const value = input.value;

    if (value.length) {
      this.list.catalog.applyDateFilter({
        filterKey: filterItem.key,
        eq: new Date(value),
      });
    } else {
      this.list.catalog.removeFilter({ filterKey: filterItem.key });
    }
  }
}
