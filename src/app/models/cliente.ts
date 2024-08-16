export class Cliente {
    idCliente?: number;
    nomeCliente: string;
    telefone: string;
    email: string;
    cpf: string;
    idMedico: number; // Agora é um número diretamente
    status: string;
  
    constructor(
      idCliente: number,
      nomeCliente: string,
      telefone: string,
      email: string,
      cpf: string,
      idMedico: number, // Alterado para número
      status: string
    ) {
      this.idCliente = idCliente;
      this.nomeCliente = nomeCliente;
      this.telefone = telefone;
      this.email = email;
      this.cpf = cpf;
      this.idMedico = idMedico;
      this.status = status;
    }
  }
  