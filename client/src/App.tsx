import React, {useEffect} from 'react';
import {Route, Routes } from 'react-router-dom';
import Authorization from "./components/pages/Authorization";
import Index from "./components/pages/Index";
import Catalog from "./components/pages/Catalog";
import Admin from "./components/pages/Admin";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {cleanAction} from "./store/reducers/messageSlice";
import {authAPI} from "./api/auth";
import {optionAPI} from "./api/option";
import Product from "./components/pages/Product";
import {loadCartItems} from "./store/reducers/commonSlice"
import Cart from "./components/pages/Cart";

function App() {
    const message = useAppSelector(state => state.message)
    const [validate, {isLoading, isSuccess}] = authAPI.useValidateMutation()
    const {isLoading: optionsIsLoading} = optionAPI.useGetOptionsQuery()
    const dispatch = useAppDispatch()

    useEffect(() => {
        validate()
        dispatch(loadCartItems())
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if (message.error || message.success) {
                dispatch(cleanAction())
            }
        }, 2000)
    }, [message.error, message.success])

    if (optionsIsLoading) return <></>

    return (
        <Routes>
            <Route path='/' element={<Index />} index={true} />
            <Route path='/authorization/' element={<Authorization />} />
            <Route path='/catalog/:id' element={<Product />} />
            <Route path='/admin/' element={<Admin />} />
            <Route path='/catalog/' element={<Catalog />} />
            <Route path='/cart/' element={<Cart />} />
        </Routes>
    );

}

export default App;
