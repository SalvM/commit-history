const { Octokit } = require("@octokit/core");

// https://docs.github.com/en/rest/users/users
const getUser = async (token) => {
    const octokit = new Octokit({
        auth: token
    });

    return await octokit.request('GET /user', {});
};

// https://docs.github.com/en/rest/commits/commits
const getCommits = async (token) => {
    const octokit = new Octokit({
        auth: token
    })
    
    return await octokit.request('GET /repos/SalvM/commit-history/commits', {
        owner: 'OWNER',
        repo: 'REPO'
    });
}

export default {
    getUser,
    getCommits
};