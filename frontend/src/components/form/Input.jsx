function Input({ label, name, placeholder, type="text" ,disabled, required, value }) {
  return (
    <div className="w-full mb-4 mt-6">
      <label className="mb-2 dark:text-gray-300">{label}</label>
      <input type={type}
        disabled={disabled}
        required={required}
        defaultValue={value}
        name={name}
        className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
        placeholder={placeholder} />
    </div>
  );
}

export default Input;
