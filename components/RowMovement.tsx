import { IMovement, IMovementCoinExchange } from "@/types"

export function RowMovement({ tipo, cantidad, fecha, numero_cuenta, ventanilla }: IMovement) {
  return (
    <tr>
      <td>{ tipo }</td>
      <td>${ cantidad }</td>
      <td>{ fecha }</td>
      <td>{ numero_cuenta }</td>
      <td>{ ventanilla }</td>
    </tr>
  )
}

export function RowMovementCoinExchange({ 
  monedaEntrada,
  cantidadEntrada,
  monedaSalida,
  cantidadSalida,
  fecha,
  ventanilla
}: IMovementCoinExchange) {
  return (
    <tr>
      <td>{ monedaEntrada }</td>
      <td>${ cantidadEntrada }</td>
      <td>{ monedaSalida }</td>
      <td>${ cantidadSalida }</td>
      <td>{ fecha }</td>
      <td>{ ventanilla }</td>
    </tr>
  )
}