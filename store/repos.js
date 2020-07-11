export const state = () => ({
  list: [],
  favourites: [],
  repo: {
    metadata: {},
    tree: {},
  },
});

export const mutations = {
  clean(state) {
    state = {
      list: [],
      favourites: [],
      repo: {
        metadata: {},
        tree: {}
      }
    };
  },
  setRepos(state, Repos) {
    state.list = Array.from((new Set(Repos)))
  },
  setRepo(state, Repo) {
    state.repo.metadata = Repo;
  },
  setTree(state, Tree) {
    state.repo.tree = Tree;
  },
  async fetchRepos(state) {
    state.list = [];
    let { data } = await this.$axios.get("https://api.github.com/user/repos");
    this.commit("repos/setRepos", data);
  },
  async select(state, id) {
    let repo = state.list.filter(el => el.id === id)[0];
    state.repo.metadata = repo;

    let Commits = await this.$axios.get(repo.commits_url.replace("{/sha}", ""));
    let tree = await this.$axios.get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/git/trees/${Commits.data[0].sha}?recursive=1`);

    this.commit("files/setFiles", tree.data.tree);
  },
  removeFavourite(state, id) {
      state.favourites = state.favourites.filter(el => el !== id);
  },
  addFavourite(state, id) {
      state.favourites.push(id);
  },
}