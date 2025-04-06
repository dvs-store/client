import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { IProductPreview } from '../interfaces/IProductPreview';
import { Observable, of, tap } from 'rxjs';
import { Id } from '../../../shared/interfaces/api/Id';
import { IProduct } from '../interfaces/IProduct';
import { ICreateProduct } from '../interfaces/ICreateProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products = signal<IProductPreview[] | null>(null);
  private productsByName:Map<string, IProduct> = new Map();
  private productsById = signal<Map<string, IProduct>>(new Map());
  private url = signal('http://localhost:8080/api/products');

  constructor(
    private clientHttp:HttpClient,
  ){}


  public getProducts():Observable<IProductPreview[]> {
    if( this.products() != null ) return of(this.products()!);

    return this.clientHttp.get<IProductPreview[]>(`${this.url()}`)
      .pipe(
        tap(p => this.products.set(p)),
      );
  }

  public findById(id:Id):Observable<IProduct>{
    return this.clientHttp.get<IProduct>(`${this.url()}/${id}`)
      .pipe(
        tap(p => this.productsById().set(p.id as string, p)),
      );
  }

  public findByName(name:string):Observable<IProduct>{
    const searchName = name.replaceAll('-', ' ').toLowerCase();
    const product = this.productsByName.get(searchName);

    if(product) return of(product);
    return this.clientHttp.get<IProduct>(`${this.url()}/find-by-name/${name}`)
      .pipe(
        tap(p => this.productsByName.set(p.name, p)),
      );
  }

  public addProduct(dto:ICreateProduct):Observable<boolean>{
    const body = new FormData();
    body.append('image', dto.image);
    body.append('name', dto.name);
    body.append('price', dto.price.toString());
    body.append('stock', dto.stock.toString());

    if( dto.scriptLink ){
      body.append('scriptLink', dto.scriptLink);
    }
    if( dto.youtubeLink ){
      body.append('youtubeLink', dto.youtubeLink);
    }
    if( dto.discordLink ){
      body.append('discordLink', dto.discordLink);
    }

    dto.images.forEach(image => {
      body.append('images', image);
    });

    dto.catgories.forEach(c => {
      body.append('categories', c);
    });

    body.append('status', dto.status);

    return this.clientHttp.post<boolean>(this.url(), body);
  }


}
