import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';
import { ReturnFormat } from '../components/enums/returnFormat.enum';

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

  formatearFecha = (fecha: string,returnFormat:ReturnFormat) => {

    const d = new Date(fecha);

    const yyyy = d.getFullYear();
    const MM = String(d.getMonth() + 1).padStart(2, '0'); //Enero es 0
    const dd = String(d.getDate()).padStart(2, '0');
    const HH = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    switch(returnFormat){
      case ReturnFormat.yyyyMMdd_HHmmss:
        return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`
        break;
      case ReturnFormat.yyyyddMM_HHmmss:
        return `${yyyy}-${dd}-${MM} ${HH}:${mm}:${ss}`
        break
      case ReturnFormat.MMddYYYY_HHmmss:
        return `${MM}-${dd}-${yyyy} ${HH}:${mm}:${ss}`
        break;
      case ReturnFormat.ddMMyyyy_HHmmss:
        return `${dd}-${MM}-${yyyy} ${HH}:${mm}:${ss}`
        break;
      case ReturnFormat.MMdd_HHmmssm:
        return `${MM}-${dd} ${HH}:${mm}:${ss}`
        break
        //CORTOS
      case ReturnFormat.ddMMyyyy:
        return `${dd}-${MM}-${yyyy}`
        break
      case ReturnFormat.MMddyyyy:
        return `${MM}-${dd}-${yyyy}`
        break
      case ReturnFormat.yyyyMMdd:
        return `${yyyy}-${MM}-${dd}`
        break
    }
  }
}
