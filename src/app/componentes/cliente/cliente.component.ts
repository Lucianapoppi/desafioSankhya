import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';

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

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.buscarClientes();
  }

  buscarClientes(): void {
    this.clienteService.listarClientes()
      .subscribe(
        (clientes: Cliente[]) => {
          this.clientes = clientes;
          this.sortedClientes = [...clientes];
        },
        (error: any) => {
          console.error('Erro ao buscar clientes', error);
        }
      );
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
