import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  private apiUrl = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) { }

  // cadastrarCliente(cliente: Cliente): Observable<any> {
  //   return this.http.post<Cliente>(`${this.apiUrl}`, Cliente);
  // }

  adicionarCliente(cliente: Cliente): Observable<any> {
    return this.http.post<Cliente>(`${this.apiUrl}`, cliente);
}


  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}`);
  }
  buscarClientePorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }


  atualizarCliente(id: number, cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cliente);
  }
}


