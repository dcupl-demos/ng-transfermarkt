import { Injectable } from '@angular/core';
import { Dcupl } from '@dcupl/core';
import { DcuplAppLoader } from '@dcupl/loader';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DcuplService {
  public dcupl = new Dcupl({
    config: {
      projectId: 'YAS91UMt6wZ5UlwzWd0f',
      apiKey: 'aae38ecb-faa9-467f-a238-d7829b077fda',
    },
  });
  public loader = new DcuplAppLoader();
  constructor() {}

  public async init() {
    this.dcupl.addLoader(this.loader);

    if (environment.devServerLoaderUrl!) {
      await this.loader.fetchConfig({
        url: environment.devServerLoaderUrl,
      });
    } else {
      // fetches the config from the dcupl CDN
      // https://cdn.dcupl.com/files/projects/YAS91UMt6wZ5UlwzWd0f/draft/dcupl.lc.json
      await this.loader.fetchConfig();
    }

    await this.loader.process({
      applicationKey: environment.application,
      environmentKeys: [environment.environment],
    });

    this.dcupl.on$().subscribe(console.log);

    await this.dcupl.init();
  }
}
