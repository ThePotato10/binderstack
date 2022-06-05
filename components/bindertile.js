import router from "next/router";

import { TiDelete } from "react-icons/ti";
import { MdModeEdit } from "react-icons/md";

const BinderTile = (props) => {
    return (
        <div onClick={() => router.push(`/binder/${props.address}`)} className="flex justify-between px-8 py-4 my-2 border-2 rounded-md border-zinc-200 group hover:shadow-md">
            <div>
                <span className="text-xl">{props.name}</span>
                <span className="ml-6 text-gray-500 text-md">{props.pages.length + (props.pages.length === 1 ? " Page" : " Pages")}</span>
            </div>
            <div className="flex items-center justify-around w-16">
                <MdModeEdit 
                    onClick={e => {e.stopPropagation(); router.push(`/edit?id=${props.address}`)}} 
                    title="edit" 
                    className="text-gray-300 cursor-pointer group-hover:text-violet-600 hover:scale-125"
                />
                <TiDelete title="delete" className="text-gray-300 cursor-pointer group-hover:text-violet-600 hover:scale-125"/>
            </div>
        </div>
    )
}

export default BinderTile;