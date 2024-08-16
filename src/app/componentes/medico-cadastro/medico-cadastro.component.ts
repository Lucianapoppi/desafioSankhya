import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MedicoService } from '../../services/medico.service';
import { Medico } from '../../models/medico';

@Component({
  selector: 'app-medico-cadastro',
  templateUrl: './medico-cadastro.component.html',
  styleUrls: ['./medico-cadastro.component.css']
})
export class MedicoCadastroComponent {
  onSubmit(): void {
    this.salvar();
  }
  medico: Medico = {
    nomeMedico: '',
    telefone: '',
    email: '',
    especializacao: '',
    experiencia: '',
    status: 'ATIVO'
  };

  constructor(private medicoService: MedicoService, private router: Router) {}

  salvar(): void {
    this.medicoService.adicionarMedico(this.medico).subscribe(() => {
      this.router.navigate(['/medico']); 
    });
  }

  cancelar(): void {
    this.router.navigate(['/medico']); 
  }
}
