import { Injectable } from '@angular/core';
import { Dcupl } from '@dcupl/core';
import { DcuplAppLoader } from '@dcupl/loader';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DcuplService {
  public dcupl = new Dcupl();
  public loader = new DcuplAppLoader();
  constructor() {}

  public async init() {
    this.dcupl.addLoader(this.loader);
    await this.loader.fetchConfig({
      url: environment.loaderUrl,
    });

    await this.loader.process({
      applicationKey: environment.application,
      environmentKeys: [environment.environment],
    });

    this.dcupl.on$().subscribe(console.log);

    await this.dcupl.init();
  }
}
