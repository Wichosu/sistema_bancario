import { MutableRefObject } from "react"

interface Props {
  label: string,
  type?: string,
  name?: string,
  value?: string,
  disabled?: boolean,
  onChange?: () => void,
  ref?: MutableRefObject<any>
}

export default function Input({ 
  label,
  type = 'text',
  name,
  value = '',
  disabled = false,
  ref,
  onChange
} : Props) {
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
            ref={ref}
            onChange={onChange}
            disabled
            className="border border-neutral-500 bg-neutral-200 text-neutral-700 w-fit rounded-sm"
            required
          />
        :
          <input 
            id={name} 
            name={name} 
            type={type} 
            step={0.01}
            min={0}
            ref={ref}
            onChange={onChange}
            className="border border-neutral-500 w-fit rounded-sm"
            required
          />
      }
    </div>
  )
}