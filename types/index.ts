export type Operation = 'deposito' 
  | 'retiro' 
  | 'divisas' 
  | 'inversiones' 
  | 'actividad'
  | 'alta'

export interface Account {
  numero_cuenta: string
  fondos: number
  inversiones: number
  nombre: string
  apellido_paterno: string
  apellido_materno: string
}

export interface Movement {
  tipo: string,
  saldo: string,
  fecha: Date,
  id_sucursal: string,
  id_numero_cuenta: string
}

export interface MovementCoinExchange {
  monedaEntrada: string,
  cantidadEntrada: string,
  monedaSalida: string,
  cantidadSalida: string,
  id_sucursal: string
}