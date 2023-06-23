import { IMovement } from "@/types"

export default function RowMovement({ tipo, cantidad, fecha, numero_cuenta, ventanilla }: IMovement) {
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