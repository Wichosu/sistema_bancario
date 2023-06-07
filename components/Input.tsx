interface Props {
  label: string,
  type?: string,
  name: string
}

export default function Input({ label, type = 'text', name} : Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} >{ label }</label>
      <input 
        id={name} 
        name={name} 
        type={type} 
        className="border border-neutral-600 w-fit"
      />
    </div>
  )
}