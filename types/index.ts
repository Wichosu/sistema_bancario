export type Operation = 
  |'deposito' 
  | 'retiro' 
  | 'divisas' 
  | 'inversiones' 
  | 'actividad'
  | 'alta'
  | 'baja'
  | 'venta'
  | 'compra'
  | 'salir'

export enum CoinExchangeModes {
  Purchase = "purchase",
  Sell = "sell"
}

export interface Account {
  numero_cuenta: string,
  fondos: number,
  inversiones: number,
  nombre: string,
  apellido_paterno: string,
  apellido_materno: string,
  fecha_apertura: string,
  fecha_clausura: string
}

export interface Movement {
  numero_cuenta: string,
  tipo: string,
  cantidad: string,
  fecha: string,
  ventanilla: string
}

export interface MovementCoinExchange {
  monedaEntrada: string,
  cantidadEntrada: string,
  monedaSalida: string,
  cantidadSalida: string,
  fecha: string,
  ventanilla: string
}