"use client"
import { useMemo } from "react"
import { AxisOptions } from "react-charts"
import { Chart } from "react-charts"

interface Props {
  investment: number
}

type MoneyProjection = {
  label: string,
  money: number
}

type Series = {
  label: string,
  data: MoneyProjection[]
}

const data: Series[] = [
  {
    label: 'Prueba',
    data: [
      {
        label: "demo",
        money: 4000
      }
    ]
  },
  {
    label: 'Prueba',
    data: [
      {
        label: "demo",
        money: 4000
      }
    ]
  }

]

export default function Investment({ investment }: Props) {
  const primaryAxis = useMemo(
    (): AxisOptions<MoneyProjection> => ({
      getValue: datum => datum.label
    }),
    []
  )

  const secondaryAxes = useMemo(
    (): AxisOptions<MoneyProjection>[] => [{
      getValue: datum => datum.money
    }],
    []
  )

  return (
    <section>
      <p>Fondo en Inversion: ${ investment }</p>
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes
        }}
      />
    </section>
  )
}