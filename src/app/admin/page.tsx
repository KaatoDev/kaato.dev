'use client'
import {useRouter} from "next/navigation";
import {useLayoutEffect} from "react";

export default function EditPlugins() {
    const r = useRouter()

    useLayoutEffect(() => {
        r.push("/admin/configurations");
    })

    return (
        <div>
            {/*<meta httpEquiv={"refresh"} content={"1;url=admin/configurations"}/>*/}
        </div>
    )
}