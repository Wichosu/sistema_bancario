interface Props {
  subtitle: string
}

export default function Subtitle({ subtitle } : Props) {
  return (
    <h2 className="text-xl mb-8">
      { subtitle }
    </h2>
  )
}