import React from "react";
import { Navigate, Route } from "react-router-dom";

const DefaultRoute = ({
    component: Component,
    ...rest
}) => (
    <Route
        {...rest}

        render = {props => 

                <Navigate
                to='/signin'
                />

        }
    />
)

export default DefaultRoute