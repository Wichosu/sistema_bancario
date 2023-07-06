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

export enum AdminOperation {
  RegistrarEmpleado = "Registrar Empleado"
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
  Ventanilla = "Ventanilla",
  Acceso = "Acceso",
  Empleado = "Empleado"
}

export enum Movement {
  Tipo = "tipo",
  Cantidad = "cantidad",
  Fecha = "fecha",
  NumeroCuenta = "numero de cuenta",
  Ventanilla = "ventanilla",
}

export enum MovementCoinExchange {
  MonedaEntrada = "moneda recibida",
  CantidadEntrada = "cantidad recibida",
  MonedaSalida = "moneda entregada",
  CantidadSalida = "cantidad entregada",
  Fecha = "fecha",
  Ventanilla = "ventanilla"
}

export enum Roles {
  Admin = "ADMIN",
  Ventanilla = "VENTANILLA"
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

export interface IMovement {
  numero_cuenta: string,
  tipo: string,
  cantidad: string,
  fecha: string,
  ventanilla: string
}

export interface IMovementCoinExchange {
  monedaEntrada: string,
  cantidadEntrada: string,
  monedaSalida: string,
  cantidadSalida: string,
  fecha: string,
  ventanilla?: string
}