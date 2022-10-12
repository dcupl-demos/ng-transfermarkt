import { Component, Input, OnInit } from '@angular/core';
import { FilterItem, NumberFilterOptions } from '@dcupl/common';
import { DcuplList } from '@dcupl/core';

@Component({
  selector: 'app-filter-number',
  templateUrl: './filter-number.component.html',
  styleUrls: ['./filter-number.component.css'],
})
export class FilterNumberComponent implements OnInit {
  @Input() list!: DcuplList;
  @Input() filterItem!: FilterItem;

  constructor() {}

  ngOnInit() {}

  public applyNumberFilter(
    minInput: HTMLInputElement,
    maxInput: HTMLInputElement,
    filterItem: FilterItem
  ) {
    const minValue = minInput.value;
    const maxValue = maxInput.value;

    const options: NumberFilterOptions = {
      filterKey: filterItem.key,
    };

    if (minValue === '' && maxValue === '') {
      this.list.catalog.removeFilter({ filterKey: filterItem.key });
    } else {
      if (minValue !== '') {
        options.gte = parseInt(minValue);
      }

      if (maxValue !== '') {
        options.lte = parseInt(maxValue);
      }
      this.list.catalog.applyNumberFilter(options);
    }
  }
}
