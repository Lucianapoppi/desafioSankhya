import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico.service';
import { Medico } from '../../models/medico';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  sortColumn: string = 'nomeMedico';
  sortDirection: string = 'asc';
  medicos: Medico[] = [];
  sortedMedicos: Medico[] = [];
  editIndex: number | null = null;
  editedMedico: Medico | null = null;
  novoMedico: Medico = new Medico(0, '', '', '', '', '', ''); 
  mostrandoFormulario: boolean = false; 
  criandoNovo: boolean = false; 

  constructor(private medicoService: MedicoService) { }

  ngOnInit(): void {
    this.buscarMedicos();
  }

  buscarMedicos(): void {
    this.medicoService.listarMedicos()
      .subscribe(
        (medicos: Medico[]) => {
          this.medicos = medicos;
          this.sortedMedicos = [...medicos];
        },
        (error: any) => {
          console.error('Erro ao buscar médicos', error);
        }
      );
  }

  editMedico(index: number): void {
    this.editIndex = index;
    this.editedMedico = { ...this.sortedMedicos[index] };
  }

  cancelarEdicao(): void {
    this.editIndex = null;
    this.editedMedico = null;
    this.mostrandoFormulario = false;
    this.criandoNovo = false;
  }

  salvarMedico(medico: Medico): void {
    if (this.editIndex !== null && medico.idMedico !== undefined) {
      this.medicoService.atualizarMedico(medico.idMedico, medico).subscribe(
        () => {
          this.sortedMedicos[this.editIndex!] = medico;
          this.cancelarEdicao();
        },
        (error: any) => {
          console.error('Erro ao atualizar médico', error);
        }
      );
    } else if (this.criandoNovo) {
      this.medicoService.adicionarMedico(medico).subscribe(
        (novoMedico: Medico) => {
          this.medicos.push(novoMedico);
          this.sortedMedicos = [...this.medicos];
          this.cancelarEdicao();
        },
        (error: any) => {
          console.error('Erro ao adicionar médico', error);
        }
      );
    } else {
      console.error('ID do médico não definido.');
    }
  }

  criarNovaLinha(): void {
    this.criandoNovo = true;
    this.sortedMedicos.push(new Medico(0, '', '', '', '', '', ''));
  }
}
