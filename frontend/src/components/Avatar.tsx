export function Aavtar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-8 h-8 bg-black rounded-full dark:bg-gray-600">
      <span className="font-medium text-white">
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}
