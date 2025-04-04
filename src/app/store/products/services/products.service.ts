import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { IProductPreview } from '../interfaces/IProductPreview';
import { Observable, of } from 'rxjs';
import { Id } from '../../../shared/interfaces/api/Id';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products = signal<IProductPreview[] | null>(null);
  private url = signal('http://localhost:8080/api/products');

  constructor(
    private clientHttp:HttpClient,
  ){}


  public getProducts():Observable<IProductPreview[]> {
    if( this.products() ) return of(this.products()!);
    return this.clientHttp.get<IProductPreview[]>(`${this.url()}`);
  }

  public findById(id:Id):Observable<IProduct>{
    return this.clientHttp.get<IProduct>(`${this.url()}/${id}`);
  }


}
