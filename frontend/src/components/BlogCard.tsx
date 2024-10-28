interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    imageUrl?: string; // New prop for the content image
  }
  
  export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    imageUrl,
  }: BlogCardProps) => {
    return (
      <div className="bg-slate-50 shadow-lg rounded-lg p-6 mb-4 border border-gray-200 flex flex-col md:flex-row">
        <div className="md:w-2/3 md:ml-6">
          <div className="flex items-center mb-4 text-sm text-gray-600">
            <Aavtar name={authorName} />
            <span className="ml-2 font-medium">{authorName}</span>
            <span className="mx-2">·</span>
            <span>{publishedDate}</span>
          </div>
          <div className="font-bold text-lg text-gray-800 mb-2">{title}</div>
          <div className="text-gray-700 mb-4">{content.slice(0, 235) + "..."}</div>
          <div className="text-gray-500 text-sm mb-4">{`${Math.ceil(
            content.length / 100
          )} minutes read`}</div>
        </div>
        <div className="md:w-1/3 mb-4 md:mb-0">
          <img
            src={imageUrl}
            alt="Blog content image"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      </div>
    );
  };
  
  function Aavtar({ name }: { name: string }) {
    return (
      <div className="relative inline-flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {name[0].toUpperCase()}
        </span>
      </div>
    );
  }
  