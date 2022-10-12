import { Component, Input, OnInit } from '@angular/core';
import { FilterConstraint, ListMetadata } from '@dcupl/common';
import { DcuplList } from '@dcupl/core';

@Component({
  selector: 'app-applied-filters-bar',
  templateUrl: './applied-filters-bar.component.html',
  styleUrls: ['./applied-filters-bar.component.css'],
})
export class AppliedFiltersBarComponent implements OnInit {
  @Input() list!: DcuplList;
  @Input() meta!: ListMetadata;

  constructor() {}

  ngOnInit() {}

  removeFilter(item: FilterConstraint) {
    if (item.type === 'referenceConstraint') {
      this.list.catalog.removeFilter({
        filterKey: item.filterKey,
        filterEntryKey: item.value,
      });
    } else {
      this.list.catalog.removeFilter({ filterKey: item.filterKey });
    }
  }
}
