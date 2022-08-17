import Octokit from "../utils/Octokit";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

export default function AccessPage() {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async data => {
        try {
            const response = await Octokit.getUser(data?.token);
            if(response?.status !== 200) throw response;
            localStorage.setItem('access_token', data?.token);
            navigate('/history');
        } catch(e) {

        } finally {

        }
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