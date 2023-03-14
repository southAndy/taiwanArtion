import {useRouteError} from "react-router-dom";
import styled,{css} from "styled-components";

export default function ErrorPage  (){
    const error = useRouteError()
    console.log(error);

    return (
        <div id="error">
            <h1>Oops</h1>
            <p>Sorry, an unexcpected error has occured</p>
            <p>
                {error.statusText || error.message}
            </p>
            <h3>是否要回到首頁？</h3>
            <a href={'/'}>Home</a>
        </div>
    )
}