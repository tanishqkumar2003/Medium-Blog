import { Aavtar } from "./Avatar"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4 bg-slate-200">
        <div className="flex flex-col justify-center font-bold text-2xl">
            Medium
        </div>
        <div>
            <Aavtar name={"abc"} />
        </div>
    </div>
}