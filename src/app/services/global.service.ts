import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public headers = new HttpHeaders({'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Headers':'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
  'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, DELETE',
  'Allow':'GET, POST, OPTIONS, PUT, DELETE'
  })
  public options:any = {headers:this.headers};

  constructor(



  ) { }
}
