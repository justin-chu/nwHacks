export const search = async (search_term, abortController = new AbortController()) => {
    
    //remove symbols from search term
    search_term = search_term.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    search_term = search_term.toLowerCase();
    const url = "https://nwhacks-301300.uc.r.appspot.com/search?q="+search_term
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
