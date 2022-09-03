import React from 'react'
import Header from '../header'

interface IProps {
    children: React.ReactNode
}

export default function PrincipalHeader({ children }: IProps) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}
