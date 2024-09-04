export interface InputProps {
  type: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  value?: string;
  name: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  required,
  className,
  value,
  name,
  label,
  onChange,
}) => {
  return (
    <div className={`py-3 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-lg font-medium text-gray-300"
        >
          {label}
        </label>
      )}

      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        id={name}
        onChange={onChange}
        className="mt-1 bg-transparent py-2 px-4 xl:px-8 rounded-3xl focus:ring-2 focus:border-transparent ring-red-500 border text-white w-full"
      />
    </div>
  );
};

export default Input;
