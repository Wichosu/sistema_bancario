interface Props {
  label: string,
  type?: string,
  name?: string,
  value?: string,
  disabled?: boolean
}

export default function Input({ label, type = 'text', name, value, disabled} : Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} >{ label }</label>
      {
        disabled
        ?
          <input 
            id={name} 
            name={name} 
            type={type} 
            value={value}
            disabled
            className="border border-neutral-500 w-fit rounded-sm"
            required
          />
        :
          <input 
            id={name} 
            name={name} 
            type={type} 
            value={value}
            className="border border-neutral-500 w-fit rounded-sm"
            required
          />
      }
    </div>
  )
}