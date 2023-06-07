interface Props {
  subtitle: string
}

export default function Subtitle({ subtitle } : Props) {
  return (
    <h2 className="text-xl">
      { subtitle }
    </h2>
  )
}