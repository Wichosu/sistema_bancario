export enum Operation {
  Deposito = "deposito",
  Retiro = "retiro",
  Divisas = "divisas",
  Inversiones = "inversiones",
  Actividad = "actividad",
  Alta = "alta",
  Baja = "baja",
  Salir = "salir"
}

export enum CoinExchangeOperations {
  Compra = "compra",
  Venta = "venta"
}

export enum CoinExchangeModes {
  Purchase = "purchase",
  Sell = "sell"
}

export enum DB {
  Banco = "Banco"
}

export enum Collections {
  Cuenta = "Cuenta",
  Movimiento = "Movimiento",
  Movimiento_Divisa = "Movimiento_Divisa",
  Ventanilla = "Ventanilla"
}

export interface Account {
  numero_cuenta: string,
  fondos: number,
  inversiones: number,
  nombre: string,
  apellido_paterno: string,
  apellido_materno: string,
  fecha_apertura: string,
  fecha_clausura?: string
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
  ventanilla?: string
}