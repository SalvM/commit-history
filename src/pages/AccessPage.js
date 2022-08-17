import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

export default function AccessPage() {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        navigate('/history');
    }

    return (
        <div style={{flex: 1}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("token", { required: true })} />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}