import React from "react";
import { useParams } from 'react-router-dom';

export function withRouter<Props>(Component: React.ComponentType<Props>) {
    let RouterIdComponent = (props: Props) => {
        return < Component {...props} params={useParams()} />
    }

    return RouterIdComponent
}