import {Box, Button, Container, TextField} from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import React, { useState } from "react";

import Octokit from "../utils/Octokit";
import { useNavigate } from 'react-router-dom';

export default function AccessPage() {
    const navigate = useNavigate();
    const { control, register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        defaultValues: {
            token: ''
        }
      });
    const [loading, setLoading] = useState(false);

    console.log({errors})

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
        <Box style={{flex: 1}} id="access-container">
            <Container maxWidth="sm" id="access-card">
                <h3>Use GitHub Access Token</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller 
                        name="token"
                        control={control}
                        rules={{required: true, minLength: 3}}
                        render={({ field: { onChange, onBlur, value }, fieldState: { isDirty } }) => (
                            <TextField
                                id="token_field"
                                onBlur={onBlur}
                                onChange={(v) => onChange(v.target.value.trim())}
                                placeholder={"Access Token"}
                                value={value}
                                autoComplete={"off"}
                            />
                        )}
                    />
                    <Button type="submit" variant="contained" disabled={loading}>Login</Button>
                </form>
                {
                    errors?.token?.type && <p class="error">Insert a valid access token</p>
                }
            </Container>
        </Box>
    );
}