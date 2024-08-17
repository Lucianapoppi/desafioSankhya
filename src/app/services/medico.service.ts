import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico } from '../models/medico'; // Ajuste o caminho conforme necessário

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private apiUrl = 'http://localhost:8080/medicos'; // URL base da API

  constructor(private http: HttpClient) { }

  listarMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.apiUrl}/recuperarMedicos`);
  }

  atualizarMedico(id: number, medico: Medico): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, medico);
  }

  adicionarMedico(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(`${this.apiUrl}`, medico);
  }

  buscarMedicoPorId(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.apiUrl}/${id}`);
  }
  
}
