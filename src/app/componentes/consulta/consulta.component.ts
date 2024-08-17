import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';
import { ClienteService } from '../../services/cliente.service';
import { MedicoService } from '../../services/medico.service';
import { Cliente } from '../../models/cliente';
import { Medico } from '../../models/medico';
import { Consulta } from '../../models/consulta.model';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  sortColumn: string = 'dataConsulta';
  sortDirection: string = 'asc';
  consultas: Consulta[] = [];
  sortedConsultas: Consulta[] = [];
  editIndex: number | null = null;
  editedConsulta: Consulta | null = null;
  medicosArray: Medico[] = [];
  clientesArray: Cliente[] = [];

  constructor(
    private consultaService: ConsultaService,
    private clienteService: ClienteService,
    private medicoService: MedicoService
  ) { }

  ngOnInit(): void {
    this.buscarConsultas();
    this.buscarClientes();
    this.buscarMedicos();
  }

  buscarConsultas(): void {
    this.consultaService.listarConsultas().subscribe(
      (consultas: Consulta[]) => {
        this.consultas = consultas;
        this.sortedConsultas = [...consultas];
      },
      (error: any) => {
        console.error('Erro ao buscar consultas', error);
      }
    );
  }

  buscarClientes(): void {
    this.clienteService.listarClientes().subscribe(
      (clientes: Cliente[]) => {
        this.clientesArray = clientes;
      },
      (error: any) => {
        console.error('Erro ao buscar clientes', error);
      }
    );
  }

  buscarMedicos(): void {
    this.medicoService.listarMedicos().subscribe(
      (medicos: Medico[]) => {
        this.medicosArray = medicos;
      },
      (error: any) => {
        console.error('Erro ao buscar médicos', error);
      }
    );
  }

  getNomeCliente(idCliente: number): string {
    const cliente = this.clientesArray.find(c => c.idCliente === idCliente);
    return cliente ? cliente.nomeCliente : 'Desconhecido';
  }

  getNomeMedico(idMedico: number): string {
    const medico = this.medicosArray.find(m => m.idMedico === idMedico);
    return medico ? medico.nomeMedico : 'Desconhecido';
  }

  editConsulta(index: number): void {
    this.editIndex = index;
    this.editedConsulta = { ...this.sortedConsultas[index] };
  }

  cancelarEdicao(): void {
    this.editIndex = null;
    this.editedConsulta = null;
  }

  salvarConsulta(consulta: Consulta): void {
    if (this.editIndex !== null && this.editIndex >= 0 && this.editIndex < this.sortedConsultas.length) {
      if (consulta.idConsulta !== undefined) {
        this.consultaService.atualizarConsulta(consulta.idConsulta, consulta).subscribe(
          () => {
            this.sortedConsultas[this.editIndex!] = consulta;  // Usando ! para garantir que editIndex não é null aqui
            this.cancelarEdicao();
            this.buscarConsultas();
          },
          (error: any) => {
            console.error('Erro ao atualizar consulta', error);
          }
        );
      } else {
        console.error('ID da consulta não definido.');
      }
    } else {
      console.error('Índice de edição inválido.');
    }
  }

  deletarConsulta(idConsulta: number): void {
    if (idConsulta !== undefined) {
      if (confirm('Tem certeza que deseja excluir esta consulta?')) {
        this.consultaService.excluirConsulta(idConsulta).subscribe(
          () => {
            this.sortedConsultas = this.sortedConsultas.filter(c => c.idConsulta !== idConsulta);
          },
          (error: any) => {
            console.error('Erro ao excluir consulta', error);
          }
        );
      }
    } else {
      console.error('ID da consulta não definido.');
    }
  }
}
