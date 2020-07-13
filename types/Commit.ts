export default interface Commit {
    url: String,
    sha: String,
    node_id: String,
    html_url: String,
    comments_url: String,
    commit: {
        url: String,
        author: {
            name: String,
            email: String,
            date: String
        },
        committer: {
            name: String,
            email: String,
            date: String
        },
        message: String,
        tree: {
            url: String,
            sha: String
        },
        comment_count: Number,
        verification: {
            verified: false,
            reason: String,
            signature: null,
            payload: null
        }
    },
    author: {
        login: String,
        id: Number,
        node_id: String,
        avatar_url: String,
        gravatar_id: String,
        url: String,
        html_url: String,
        followers_url: String,
        following_url: String,
        gists_url: String,
        starred_url: String,
        subscriptions_url: String,
        organizations_url: String,
        repos_url: String,
        events_url: String,
        received_events_url: String,
        type: String,
        site_admin: false
    },
    committer: {
        login: String,
        id: Number,
        node_id: String,
        avatar_url: String,
        gravatar_id: String,
        url: String,
        html_url: String,
        followers_url: String,
        following_url: String,
        gists_url: String,
        starred_url: String,
        subscriptions_url: String,
        organizations_url: String,
        repos_url: String,
        events_url: String,
        received_events_url: String,
        type: String,
        site_admin: false
    },
    parents: [
        {
            url: String,
            sha: String
        }
    ]
}