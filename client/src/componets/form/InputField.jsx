import { FormError } from "../ui/FormError"
import { Input } from "../ui/Input"

export function InputField({ label, id, type = "text", value, onChange, error, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md ${error ? "border-destructive" : "border-input"
          }`}
      />
      {error && <FormError children={error} className="text-sm text-destructive mt-1" />}
    </div>
  )
}

