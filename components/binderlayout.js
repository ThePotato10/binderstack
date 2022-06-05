import { useEffect, useState } from "react";
import { getLinkPreview } from "link-preview-js";

export const BinderLayout = ({ pages }) => {
    let key = 0;

    const [previewDataArray, setPreviewDataArray] = useState([]);

    useEffect(() => {
        Promise.allSettled(pages.map(page => getLinkPreview(page))).then(results => {
            let fulfilled = [];
            
            results.forEach(res => {
                if (res.status === "fulfilled") {
                    fulfilled.push(res.value);
                }
            });

            setPreviewDataArray(fulfilled);
        });
    }, []);

    return (
        <div className="flex flex-wrap">{
            previewDataArray.map(preview => {
                return (
                    <div className="box-border w-1/4 m-4" key={++key}>
                        <img 
                            src={(preview.images[0] || preview.favicons[0]) ?? "http://localhost:3000/default-loading-image.png"}
                            className="w-full"
                        />
                        <p className="font-bold">{preview.title}</p>
                        <a className="text-blue-600 visited:text-purple-700" href={preview.url} rel="noopener noreferrer nofollow">{preview.url}</a>
                    </div>
                );
            })
        }</div>
    );
};

export default BinderLayout;