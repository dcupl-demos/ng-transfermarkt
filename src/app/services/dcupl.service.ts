import { Injectable } from '@angular/core';
import { Dcupl } from '@dcupl/core';
import { DcuplAppLoader } from '@dcupl/loader';

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
      url: 'http://localhost:8083/dcupl.lc.json',
    });

    await this.loader.process({
      applicationKey: 'players-advanced',
      environmentKeys: ['localhost'],
    });

    this.dcupl.on$().subscribe(console.log);

    await this.dcupl.init();
  }
}
