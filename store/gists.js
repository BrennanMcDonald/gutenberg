function compare(a, b) {
    if (a.description.toLowerCase() < b.description.toLowerCase()) {
        return -1;
    }
    if (a.description.toLowerCase() > b.description.toLowerCase()) {
        return 1;
    }
    return 0;
}

export const state = () => ({
    list: [],
    selected: {},
});

export const mutations = {
    setGists(state, Repos) {
        state.list = Array.from((new Set(Repos)))
    },
    selectGistById(state, id) {
        [state.selected] = state.list.filter(el => el.id === id)
    },
    async fetchGists(state) {
        state.list = [];
        let gists = [];
        let url = "https://api.github.com/gists?visibility=all";
        let { data } = await this.$axios.get(url);
        console.log(data);
        gists = data.sort(compare).filter(el => el.description);
        this.commit("gists/setGists", gists);
    }
}