import { ChangeEvent } from "react"

export const BlogTitle = ({onchange}: {onchange: (e:ChangeEvent<HTMLInputElement>) => void}) => {
    return <div className="mb-6">
    <input onChange={onchange} type="text" placeholder="Title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
</div>
}