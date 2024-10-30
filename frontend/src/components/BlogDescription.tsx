// import { ChangeEvent } from "react"

// export const BlogDescription = ({onchange}: {onchange: (e:ChangeEvent<HTMLInputElement>) => void})  => {
//     return <>
//     <input id="message"  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."/>
//     </>
// }


import { ChangeEvent } from "react"

export const BlogDescription = ({onchange}: {onchange: (e:ChangeEvent<HTMLTextAreaElement>) => void}) => {
    return <div className="mb-6">
    {/* <input onChange={onchange} type="text" className="block p-2.5 w-full h-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."/> */}
    <textarea onChange={onchange} className="block p-2.5 h-52 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
</div>
}
