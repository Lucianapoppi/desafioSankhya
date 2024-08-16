import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { Medico } from '../../models/medico';
import { MedicoService } from '../../services/medico.service';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css']
})
export class ClienteCadastroComponent implements OnInit {
  cliente: Cliente = {
    nomeCliente: '',
    telefone: '',
    email: '',
    cpf: '',
    idMedico: 0, 
    status: 'ATIVO'
  };
  medicos: Medico[] = [];

  constructor(
    private clienteService: ClienteService,
    private medicoService: MedicoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.medicoService.listarMedicos().subscribe((medicos) => {
      this.medicos = medicos;
    });
  }

  onSubmit(): void {
    this.salvar();
  }

  salvar(): void {
    console.log('Cliente a ser enviado:', this.cliente);

    if (typeof this.cliente.idMedico === 'string') {
      this.cliente.idMedico = parseInt(this.cliente.idMedico, 10);
    }

    if (isNaN(this.cliente.idMedico) || this.cliente.idMedico <= 0) {
      alert('O ID do médico é obrigatório e deve ser um número válido.');
      return;
    }

    this.clienteService.adicionarCliente(this.cliente).subscribe(
      (res: any) => {
        console.log(this.cliente);
        this.router.navigate(['/cliente']);
      },
      (err: any) => {
        console.error('Erro ao adicionar cliente', err);
        alert('Ocorreu um erro ao adicionar o cliente. Por favor, tente novamente.');
      }
    );
  }
}
