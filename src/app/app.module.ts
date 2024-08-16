import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { ConteudoComponent } from './componentes/conteudo/conteudo.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { MedicoComponent } from './componentes/medico/medico.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { MedicoCadastroComponent } from './componentes/medico-cadastro/medico-cadastro.component';



import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ClienteCadastroComponent } from './componentes/cliente-cadastro/cliente-cadastro.component';





@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    ConteudoComponent,
    RodapeComponent,
    MedicoComponent,
    ClienteComponent,
    MedicoCadastroComponent,
    ClienteCadastroComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
