import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../types/item';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private http: HttpClient
  ) { }

  getItems(): Observable<Item[]>{
    return this.http.get<Item[]>(`${environment.apiUrl}/api/items`);
  }

  getItemById(id: string): Observable<Item>{
    return this.http.get<Item>(`${environment.apiUrl}/api/items/${id}`);
  }

  // createItem(item: Item): Observable<Item>{
  //   return this.http.post()
  // }
}
