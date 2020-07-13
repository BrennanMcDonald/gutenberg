export default interface Contents {
    type : String,
    encoding : String,
    size : Number,
    name : String,
    path : String,
    content : String,
    sha : String,
    url : String,
    git_url : String,
    html_url : String,
    download_url : String,
    _links : {
        git : String,
        self : String,
        html : String
    }
}