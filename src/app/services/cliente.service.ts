import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Medico } from '../models/medico';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) { }

  adicionarCliente(cliente: Cliente): Observable<any> {
    return this.http.post<any>(this.apiUrl, cliente);
  }

  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}`);
  }

  buscarClientePorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  buscarMedicoPorId(idMedico: number): Observable<Medico> {
    return this.http.get<Medico>(`http://localhost:8080/medicos/${idMedico}`);
  }

  listarMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`http://localhost:8080/medicos/recuperarMedicos`);
  }

  atualizarCliente(id: number, cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cliente);
  }
}


