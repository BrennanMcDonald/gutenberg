export const state = () => ({
    selected: {},
    list: [],
    selected_data: {},
});

export const mutations = {
    setSelectedFile(state, file, root, test) {
        state.selected = file;
        this.$axios(file.url)
            .then(({ data: content }) => {
                this.commit("files/setFileContent", content)
            });
    },
    setFiles(state, files) {
        state.list = files;
    },
    setFileContent(state, content) {
        state.selected_data = content
    },
    updateContent(state, content) {
        if(content)
            state.selected_data.content = Buffer.from(content).toString('base64');
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
        this.$axios.put(`https://api.github.com/repos/${owner}/${repo}/contents/${state.selected.path}?ref=master`,data, headers)
            .then(({ data }) => {
                this.commit("files/setFileContent", data.content)
            })
        /*
        this.$axios({
            method: 'PUT',
            url: `https://api.github.com/repos/${owner}/${repo}/contents/${state.selected.path}`,
            body: JSON.stringify(data),
        }).then(({ data: content }) => {
            this.commit("files/setFileContent", content)
        });
        */
        console.log(`https://api.github.com/repos/${owner}/${repo}/contents/${state.selected.path}`);
    }
}
