import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  postData(data: any){
    return this.http.post<any>('http://localhost:3000/posts', data).pipe(map(res => {
      return res;
    }));
  }
  getData(date:any){
    return this.http.get<any>('http://localhost:3000/posts?Date='+date).pipe(map(res => {
      return res;
    }));
  }
  deleteData(id: any){
    return this.http.delete<any>('http://localhost:3000/posts/'+id).pipe(map(res => {
    // return this.http.delete<any>('http://localhost:3000/posts/id=1').pipe(map(res => {
      return res;
    }));
  }

  getupateData( id: any,data:any){
    return this.http.put<any>('http://localhost:3000/posts/'+id,data).pipe(map(res => {
      return res;
    }));
  }

//   deleteUrl = 'http://localhost:3000/jobs/id';

// deleteJob(id: number): Observable<void> {
//     return this.httpClient.delete<void>(`${this.deleteUrl}/${id}`)
//       .pipe(catchError(this.handleError));
// }

}
