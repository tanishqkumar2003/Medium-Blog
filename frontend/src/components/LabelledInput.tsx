import { ChangeEvent } from "react";

interface labelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export const LabelledInput = ({
  label,
  placeholder,
  onChange,
  type,
}: labelledInputType) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-400"
        placeholder={placeholder}
        required
      />
    </div>
  );
};
