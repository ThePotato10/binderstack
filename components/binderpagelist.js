import { TiDelete } from "react-icons/ti";

const BinderPageList = ({ items, handleDelete }) => {
    let key = 0;

    return (
        <div className="mb-4">{
            items.map(item => {
                return (
                    <div className="flex items-start justify-between p-2 my-4 border-b-2 group hover:bg-gray-100" key={++key}>
                        <a
                            className="text-blue-400"
                            href={item} 
                            rel="noopener noreferrer nofollow" 
                            target="_blank">
                            {item}
                        </a>
                        <TiDelete 
                            title="Delete this page" 
                            className="text-2xl group-hover:text-violet-600 hover:cursor-pointer"
                            onClick={() => handleDelete(item)}
                        />
                    </div>
                );
            })
        }</div>
    );
};

export default BinderPageList;