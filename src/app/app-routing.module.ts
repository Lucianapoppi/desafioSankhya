import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicoComponent } from './componentes/medico/medico.component';
import { ConteudoComponent } from './componentes/conteudo/conteudo.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { MedicoCadastroComponent } from './componentes/medico-cadastro/medico-cadastro.component';
import { ClienteCadastroComponent } from './componentes/cliente-cadastro/cliente-cadastro.component';
import { ConsultaComponent } from './componentes/consulta/consulta.component';
import { ConsultaCadastroComponent } from './componentes/consulta-cadastro/consulta-cadastro.component';


const routes: Routes = [
  { path: '', component: ConteudoComponent }, // Página inicial
  { path: 'medico', component: MedicoComponent }, // Página de Médico
  { path: 'cliente', component: ClienteComponent},
  { path: 'medicoCadastro', component: MedicoCadastroComponent },
  { path: 'clienteCadastro', component: ClienteCadastroComponent},
  { path: 'consulta', component: ConsultaComponent},
  { path: 'consultaCadastro', component: ConsultaCadastroComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
