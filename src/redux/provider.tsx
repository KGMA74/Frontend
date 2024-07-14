'use client';

import { Children } from "react";
import { makeStore } from "./store";
import { Provider } from "react-redux";

interface props {
    children: React.ReactNode;
}

const CustomProviver: React.FC<props> = ({children}) => {
    return (
        <Provider store={makeStore()}>
            {children}
        </Provider>
    );
}

export default CustomProviver;