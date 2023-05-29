import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor( private _http:HttpClient) { }

  addDepartment(data: any) :Observable<any>{
    return this._http.post('  http://localhost:3000/department',data);
  } 
    
  UpdateDepartment(id: number,data: any) :Observable<any> {
    return this._http.put(` http://localhost:3000/department/${id}`,data);
  }

  getDepartmentList() :Observable<any>{
    return this._http.get('  http://localhost:3000/department');
  } 
  
  deleteDepartment(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/department/${id}`);
  }
}
