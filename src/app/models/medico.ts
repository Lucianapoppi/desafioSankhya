export class Medico {
    idMedico?: number;
    nomeMedico: string;
    telefone: string;
    email: string;
    especializacao: string;
    experiencia: string;
    status: string;


constructor(
    idMedico: number,
    nomeMedico: string,
    telefone: string,
    email: string,
    especializacao: string,
    experiencia: string,
    status: string,
){
    this.idMedico = idMedico;
    this.nomeMedico = nomeMedico;
    this.telefone = telefone;
    this.email = email;
    this.especializacao = especializacao;
    this.experiencia = experiencia;
    this.status = status;
}
}