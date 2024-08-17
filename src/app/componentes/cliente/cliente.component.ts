  import { Component, OnInit } from '@angular/core';
  import { ClienteService } from '../../services/cliente.service';
  import { Cliente } from '../../models/cliente';
  import { Medico } from '../../models/medico';

  @Component({
    selector: 'app-cliente',
    templateUrl: './cliente.component.html',
    styleUrls: ['./cliente.component.css']
  })
  export class ClienteComponent implements OnInit {
    sortColumn: string = 'nomeCliente';
    sortDirection: string = 'asc';
    clientes: Cliente[] = [];
    sortedClientes: Cliente[] = [];
    editIndex: number | null = null;
    editedCliente: Cliente | null = null;
    medicos: { [id: number]: string } = {};
    medicosArray: Medico[] = [];

    constructor(private clienteService: ClienteService) { }

    ngOnInit(): void {
      this.buscarClientes();
    }

    buscarMedicos(): void {
      this.clienteService.listarMedicos().subscribe(
        (medicos: Medico[]) => {
          // Armazenar o array de médicos
          this.medicosArray = medicos;
          console.log(this.medicosArray)
          // Se precisar fazer algo com o array, como buscar clientes depois
        },
        (error: any) => {
          console.error('Erro ao buscar médicos', error);
        }
      );
    }
    
    

    buscarClientes(): void {
      this.clienteService.listarClientes().subscribe(
        (clientes: Cliente[]) => {
          this.clientes = clientes;
          this.sortedClientes = [...clientes];

          // Buscar o nome dos médicos para cada cliente
          this.buscarNomesMedicos(clientes);
          this.buscarMedicos();
        },
        (error: any) => {
          console.error('Erro ao buscar clientes', error);
        }
      );
    }

    buscarNomesMedicos(clientes: Cliente[]): void {
      clientes.forEach(cliente => {
        if (cliente.idMedico) {
          this.clienteService.buscarMedicoPorId(cliente.idMedico).subscribe(
            (medico: Medico) => {
              this.medicos[cliente.idMedico] = medico.nomeMedico;
              console.log(`Médico atualizado: ID ${cliente.idMedico}, Nome ${medico.nomeMedico}`);
            },
            (error: any) => {
              console.error(`Erro ao buscar médico com ID ${cliente.idMedico}`, error);
            }
          );
        }
      });
    }

    getNomeMedico(idMedico: number): string {
      return this.medicos[idMedico] || 'Desconhecido';
    }

    editCliente(index: number): void {
      this.editIndex = index;
      this.editedCliente = { ...this.sortedClientes[index] };
    }

    cancelarEdicao(): void {
      this.editIndex = null;
      this.editedCliente = null;
    }

    salvarCliente(cliente: Cliente): void {
      if (this.editIndex !== null && cliente.idCliente !== undefined) {
        this.clienteService.atualizarCliente(cliente.idCliente, cliente).subscribe(
          () => {
            this.sortedClientes[this.editIndex!] = cliente;
            this.cancelarEdicao();
            this.buscarClientes();
          },
          (error: any) => {
            console.error('Erro ao atualizar cliente', error);
          }
        );
      } else {
        console.error('ID do cliente não definido.');
      }
    }
  }
