import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  ContentfulClientApi,
  createClient,
} from 'contentful';
import { from, Observable } from 'rxjs';
import * as marked from 'marked';
// import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ContentfulService {

  private clientApi: ContentfulClientApi;
  products: any = [];

  constructor(private http:HttpClient) {
    // this.clientApi = createClient({
    //   space: environment.contentful.spaceId,
    //   accessToken: environment.contentful.token,
    // });
  }

  getDetails(item) {
    const promise = this.clientApi.getEntries(
      Object.assign({
        content_type: item
      }))
    return from(promise).pipe(map(entry => entry.items.map(i => i.fields)))
  }
  
  markdownToHtml(md: string) {
    return marked(md);
  }

  getAllProjects():Observable<any>
  {
      return this.http.get("assets/data.json")

  }

  getAlltools()
  {
      return this.http.get("assets/tools.json")
  }

}
