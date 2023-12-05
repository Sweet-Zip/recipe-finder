import React from 'react'

type ChildrenProps = {
    children: React.ReactNode;
}

export default function layout(props: ChildrenProps) {
    return (
        <div>
            {props.children}
        </div>
    )
}
