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