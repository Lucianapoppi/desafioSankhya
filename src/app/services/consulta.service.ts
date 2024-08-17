import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta.model'; // Ajuste o caminho se necessário

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private apiUrl = 'http://localhost:8080/consultas'; // Substitua pela URL do seu backend

  constructor(private http: HttpClient) { }

  // Listar todas as consultas
  listarConsultas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.apiUrl}`);
  }

  // Buscar uma consulta por ID
  buscarConsultaPorId(id: number): Observable<Consulta> {
    return this.http.get<Consulta>(`${this.apiUrl}/${id}`);
  }

  // Atualizar uma consulta existente
  atualizarConsulta(id: number, consulta: Consulta): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.apiUrl}/${id}`, consulta);
  }

  // Criar uma nova consulta
  criarConsulta(consulta: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(`${this.apiUrl}`, consulta);
  }

  // Excluir uma consulta
  excluirConsulta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
