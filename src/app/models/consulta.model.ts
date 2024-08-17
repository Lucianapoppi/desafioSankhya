export class Consulta {
  idConsulta?: number;
  dataConsulta: Date;
  horaConsulta: string;
  idCliente: number;
  idMedico: number;

  constructor(
    idConsulta?: number,
    dataConsulta?: Date,
    horaConsulta?: string,
    idCliente?: number,
    idMedico?: number
  ) {
    this.idConsulta = idConsulta;
    this.dataConsulta = dataConsulta || new Date(); // Define uma data padrão se não for fornecida
    this.horaConsulta = horaConsulta || '';
    this.idCliente = idCliente || 0; // Define um valor padrão para idCliente
    this.idMedico = idMedico || 0; // Define um valor padrão para idMedico
  }
}
