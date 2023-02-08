import React from "react";
import { useNavigate } from 'react-router-dom';

export function withNavigate<Props>(Component: React.ComponentType<Props>) {
    const RedirectTo = (props: Props) => {
        return < Component {...props} navigate={useNavigate()} />
    }
    return RedirectTo
}