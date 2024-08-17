import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router
import { ConsultaService } from '../../services/consulta.service';
import { ClienteService } from '../../services/cliente.service';
import { MedicoService } from '../../services/medico.service';
import { Cliente } from '../../models/cliente';
import { Medico } from '../../models/medico';
import { Consulta } from '../../models/consulta.model';

@Component({
  selector: 'app-consulta-cadastro',
  templateUrl: './consulta-cadastro.component.html',
  styleUrls: ['./consulta-cadastro.component.css']
})
export class ConsultaCadastroComponent implements OnInit {
  consulta: Consulta = new Consulta(); // Usando o construtor padrão
  clientes: Cliente[] = [];
  medicos: Medico[] = [];

  constructor(
    private consultaService: ConsultaService,
    private clienteService: ClienteService,
    private medicoService: MedicoService,
    private router: Router // Injetar Router
  ) {}

  ngOnInit(): void {
    this.buscarClientes();
    this.buscarMedicos();
  }

  buscarClientes(): void {
    this.clienteService.listarClientes().subscribe(
      (clientes: Cliente[]) => {
        this.clientes = clientes;
      },
      (error: any) => {
        console.error('Erro ao buscar clientes', error);
      }
    );
  }

  buscarMedicos(): void {
    this.medicoService.listarMedicos().subscribe(
      (medicos: Medico[]) => {
        this.medicos = medicos;
      },
      (error: any) => {
        console.error('Erro ao buscar médicos', error);
      }
    );
  }

  onSubmit(): void {
    if (this.consulta.dataConsulta && this.consulta.idCliente && this.consulta.idMedico) {
      this.consultaService.criarConsulta(this.consulta).subscribe(
        () => {
          alert('Consulta cadastrada com sucesso!');
          this.router.navigate(['/consulta']); // Redireciona para a rota /consultas
        },
        (error: any) => {
          console.error('Erro ao cadastrar consulta', error);
        }
      );
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}
