import { Box, Container } from "@mui/system";
import { Button, Paper } from "@mui/material";
import React, {useEffect, useMemo, useState} from "react";

import { Commit } from "../components/Commit";
import Octokit from "../utils/Octokit";

//import { useNavigate } from 'react-router-dom';

export default function HistoryPage() {
    const token = useMemo(() => localStorage.getItem('access_token'), []);
    const [commits, setCommits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastRefreshMs, setLastRefreshMs] = useState(new Date().getTime());
    const [countdown, setCountdown] = useState(30); // in seconds
    const abortController = useMemo(() => (new AbortController()), [lastRefreshMs]); // to prevent calls overlap
    //const navigate = useNavigate();

    const refresh = () => setLastRefreshMs(new Date().getTime()); // triggers the useEffect

    const updateCommitsList = async () => {
        setLoading(true);
        try {
            const response = await Octokit.getCommits(token, {signal: abortController?.signal});
            if(response?.status !== 200) throw response;
            setCommits(response?.data);
        } catch(e) {
            console.error(e);
            if (e.name == 'AbortError') {
                // do nothing
            } else if (e.message === 'Bad credentials') { // token invalid, redirect the user
                // navigate('/');
            } else {
                throw e;
            }
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        updateCommitsList();

        // it refreshes the list every 30 seconds
        const counterInterval = setInterval(() => {
            const currentMs = new Date().getTime();
            const diff = (currentMs - lastRefreshMs) / 1000;
            const countdown = 30 - Math.floor(diff);
            if(countdown === 0) {
                clearInterval(counterInterval);
                abortController?.abort();  // to prevent calls overlap
                refresh();
            }
            setCountdown(countdown);
        }, 1000);

        return () => {
            clearInterval(counterInterval);
            abortController?.abort();
        }    
    }, [lastRefreshMs]);

    const renderCommits = (list) => {
        return list?.map((c, index) => {
            return (<Commit key={index}
                        author={c.author?.login}
                        date={c.commit?.committer?.date} 
                        message={c.commit?.message}
                    />);
        })
    }

    return (
        <Box style={{flex: 1}}>
            <Paper id="commit-container" elevation={1}>
                <Box style={{flexDirection: 'row', display: 'flex'}}>
                    <h2>Commit History</h2>
                    <Button onClick={() => refresh()} disabled={loading}>Refresh</Button>
                </Box>
                <div id="list-container">
                    {renderCommits(commits)}
                </div>
                <p style={{margin: 0}}>
                    <i>Refreshing in {countdown} seconds</i>
                </p>
            </Paper>
        </Box>
    );
}