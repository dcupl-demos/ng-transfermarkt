import { Component, OnInit } from '@angular/core';
import { DcuplService } from './services/dcupl.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isLoading = true;
  public hasError = false;
  title = 'ng-transfermarkt';

  constructor(private dcuplService: DcuplService) {}

  ngOnInit() {
    this.init();
  }

  private async init() {
    try {
      console.time('dcupl init');
      await this.dcuplService.init();
      console.timeEnd('dcupl init');
      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
      this.hasError = true;
    }
  }
}
