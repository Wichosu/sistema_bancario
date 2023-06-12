export type Operation = 
  |'deposito' 
  | 'retiro' 
  | 'divisas' 
  | 'inversiones' 
  | 'actividad'
  | 'alta'
  | 'venta'
  | 'compra'

export interface Account {
  numero_cuenta: string
  fondos: number
  inversiones: number
  nombre: string
  apellido_paterno: string
  apellido_materno: string
}

export interface Movement {
  numero_cuenta: string,
  tipo: string,
  saldo: string,
  fecha: string,
}

export interface MovementCoinExchange {
  monedaEntrada: string,
  cantidadEntrada: string,
  monedaSalida: string,
  cantidadSalida: string,
  fecha: string
}