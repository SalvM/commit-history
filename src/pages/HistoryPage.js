import React, {useEffect, useMemo, useState} from "react";

import { Commit } from "../components/Commit";
import Octokit from "../utils/Octokit";

// import { useNavigate } from 'react-router-dom';

export default function HistoryPage() {
    const token = useMemo(() => (localStorage.getItem('access_token')), []);
    const [commits, setCommits] = useState([]);
    // const navigate = useNavigate();

    const updateCommitsList = async () => {
        try {
            const response = await Octokit.getCommits(token);
            if(response?.status !== 200) throw response;
            setCommits(response?.data);
        } catch(e) {
            console.error(e);
        }
    }
    
    useEffect(() => {
        updateCommitsList();
    }, []);

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
        <div>
            <h2>Commit History</h2>
            <ul>
                {renderCommits(commits)}
            </ul>
        </div>
    );
}