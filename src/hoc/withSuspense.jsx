import React, {Suspense} from 'react';
import Preloader_2 from "../components/common/preloader/Preloader_2";

export const withSuspense = (WrappedComponent) => {
    return (props) => {
        return <Suspense fallback={<Preloader_2/>}>
            <WrappedComponent {...props} />
        </Suspense>;
    };
};