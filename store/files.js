export const state = () => ({
    selected: {},
    selected_file_contents: "",
    files: [],
    file_contents: {},
});

export const mutations = {
    setSelectedFile(state, file) {
        console.log(file);
        state.selected = file;
    },
    setFiles(state, files) {
        state.files = files;
    },
    clearFileList(state) {
        state.files = [];
        state.file_contents = {};
        state.selected_file_contents = "";
    },
    getFileList(state, { repo, owner }) {
        let commit_url = `https://api.github.com/repos/${owner}/${repo}/commits`;
        this.$axios.get(commit_url).then(({ data: commit_data }) => {
            let { sha } = commit_data[0];
            let tree_url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${sha}?recursive=1`;
            this.$axios.get(tree_url).then(({ data: tree_data }) => {
                let { tree } = tree_data;
                let { path } = tree.filter(el => el.path.includes('.md'))[0];
                let name = repo;
                this.commit('files/setFiles', tree);
                this.commit('files/setSelectedFile', tree[0]);
                this.commit('files/getFileContents', { path, owner, name });
            });
        });
    },
    setSelectedFileContents(state, { content, path }) {
        state.selected_file_contents = content;
        state.file_contents[path] = content;
    },
    getFileContents(state, { path, owner, name: repo }) {
        // Check if we have the file
        console.log(owner);
        if (path in state.file_contents) {
            state.selected_file_contents = state.file_contents[path];
        } else {
            let url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=master`;
            this.$axios.get(url).then(({ data }) => {
                this.commit('files/setSelectedFileContents', data)
            });
        }
    },
    updateContent(state, { sha, content }) {
        if (content)
            state.file_contents[sha] = Buffer.from(content).toString('base64');
    },
    saveFile(state, { owner, repo }) {
        let data = {
            message: "CopperCMS Update",
            content: state.selected_data.content,
            sha: state.selected_data.sha,
        };
        let headers = {
            'Content-Type': 'application/json'
        };
        this.$axios.put(`https://api.github.com/repos/${owner}/${repo}/contents/${state.selected.path}?ref=master`, data, headers)
            .then(({ data }) => {
                // this.commit("files/setFileContent", data.content)
            })
    },
    newFile(state, { name, path, owner, repo }) {
        let data = {
            message: "New file",
            content: Buffer.from(`# ${name}`).toString('base64'),
        };
        let headers = {
            'Content-Type': 'application/json'
        };
        let FullFilePath = (path[path.length - 1] === "/") ? path + name : path + '/' + name;
        if (path === '/' || path === '') {
            FullFilePath = name;
        } else {
            FullFilePath = (path[path.length - 1] === "/") ? path + name : path + '/' + name;
        }

        this.$axios.put(`https://api.github.com/repos/${owner}/${repo}/contents/${FullFilePath}?ref=master`, data, headers)
            .then(({ data }) => {
                // this.commit("files/setFileContent", data.content)
            })
    }
}
