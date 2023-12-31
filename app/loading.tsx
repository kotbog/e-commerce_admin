"use client"
import {Spinner} from "flowbite-react";

const Loading = () => {
    return <div className={'flex justify-center items-center mt-20'}>
        <Spinner aria-label="Extra large spinner example" size="xl" />
    </div>
}

export default Loading;