export function Aavtar({ name }: { name: string }) {
    return (
      <div className="relative inline-flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full dark:bg-gray-600">
        <span className="font-medium dark:text-gray-300">
          {name[0].toUpperCase()}
        </span>
      </div>
    );
  }
  