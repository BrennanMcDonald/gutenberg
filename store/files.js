export const state = () => ({
    selected: {},
    selected_file_contents: "",
    files: [],
    file_contents: {},
    changed_files: [],
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
        state.changed_files = [];
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
        if (path in state.file_contents) {
            state.selected_file_contents = state.file_contents[path];
        } else {
            let url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=master`;
            this.$axios.get(url).then(({ data }) => {
                this.commit('files/setSelectedFileContents', data)
            });
        }
    },
    updateContent(state, { path, markdown }) {
        if (markdown) {
            state.file_contents[path] = Buffer.from(markdown).toString('base64');
            state.changed_files.push(path);
            state.changed_files = Array.from(new Set(state.changed_files));
        }
    },
    saveFile(state, { owner, repo }) {
        state.changed_files.forEach(path => {
            let data = {
                message: "CopperCMS Update",
                content: state.file_contents[path],
                sha: state.files.filter(el => el.path === path)[0].sha,
            };
            let headers = {
                'Content-Type': 'application/json'
            };
            this.$axios.put(`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=master`, data, headers)
                .then(({ data }) => {
                    // this.commit("files/setFileContent", data.content)
                })
        });
        state.changed_files = [];
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
