import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./store";
import {useEffect, RefObject} from "react";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export function useOutsideClick(ref: any, onClickOut: () => void, deps: any[]){
    useEffect(() => {
        const onClick = ({target}: any) => !ref?.current?.contains(target) && onClickOut?.()
        document.addEventListener('click', onClick)
        return () => document.removeEventListener('click', onClick);
    }, deps)
}