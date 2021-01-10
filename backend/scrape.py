import re
import requests
import bs4
import json

from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib.parse import urljoin
from typing import Dict, List, Tuple, Optional


def external_link_texts(matches: bs4.element.ResultSet) -> List[str]:
    return [a.get_text() for a in matches if not a['href'].startswith('#')]


def wiki2dict(url: str) -> Dict[str, str]:
    res = {}
    with urlopen(url) as httpresp:
        bs = BeautifulSoup(httpresp, 'html.parser')
    firstpar = bs.find('p')
    table = bs.find('table', {'class': 'vertical-navbox nowraplinks'})

    res['title'] = bs.find('h1', {'id': 'firstHeading'}).get_text()
    res['link'] = url
    res['text'] = re.sub(r'\[\d+\]', '', firstpar.get_text()).strip()

    # First search in firstpar for related:
    res['related'] = external_link_texts(firstpar.find_all('a', href=True))
    # Search in article's first table for related:
    if table is not None:
        for div in table.find_all('div', {'class': 'NavHead'}):
            res['related'] += external_link_texts(div.find_all('a', href=True))
    return res


def get_wiki_url(search_term: str) -> Optional[str]:
    S = requests.Session()
    URL = f'https://en.wikipedia.org/w/api.php?action=opensearch&search={search_term}&limit=1&namespace=0&format=json'
    data = S.get(url=URL).json()
    return data[-1][0] if data[-1] else ''


def get_utube_links(search_term: str, key) -> str:
    S = requests.Session()

    URL = f'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q={search_term}&key={key}'

    R = S.get(url=URL)
    DATA = R.json()
    return [f'https://www.youtube.com/watch?v={item["id"]["videoId"]}' for item in DATA["items"] if "videoId" in item["id"]]


def get_books(search_term):
    S = requests.Session()

    URL = f'https://www.googleapis.com/books/v1/volumes?q={search_term}'

    R = S.get(url=URL)
    DATA = R.json()

    output = []
    if 'items' in DATA:
        for item in DATA["items"]:
            result = {}
            result['title'] = item["volumeInfo"]["title"]
            result['authors'] = item["volumeInfo"]["authors"] if "authors" in item["volumeInfo"] else []
            result['thumbnail_uri'] = item["volumeInfo"]["imageLinks"]["thumbnail"] if "imageLinks" in item["volumeInfo"] else ""
            output.append(result)
    return output


def get_thumbnail_url(search_term, key):
    start_idx = '1'
    cx = 'ae77ccce312b12d27'
    search_url = f'https://www.googleapis.com/customsearch/v1?q={search_term}&start={start_idx}&key={key}&cx={cx}&searchType=image'
    r = requests.get(search_url)
    response = r.content.decode('utf-8')
    result = json.loads(response)
    if 'items' in result and result['items']:
        return result['items'][0]['link']


def get_ctree(search_term: str, ctrees: dict) -> Tuple[str, dict]:
    regexp = re.compile(f' {search_term}', flags=re.IGNORECASE)
    cmatch = min((k for k in ctrees if regexp.search(k)), key=len, default=None)
    if cmatch is None:
        return '', {}
    else:
        return cmatch, ctrees[cmatch]


def get_response_dict(search_term: str, ctrees: dict, ytb_key: str, gthumb_key: str) -> dict:
    wikiurl = get_wiki_url(search_term)
    d = wiki2dict(wikiurl) if wikiurl else {'title': search_term, 'link': '', 'text': '', 'related': []}
    d['books'] = get_books(search_term)
    d['ytb_links'] = get_utube_links(search_term, ytb_key)
    d['imgurl'] = get_thumbnail_url(search_term, gthumb_key)
    k, v = get_ctree(search_term, ctrees)
    d['steps'] = {k: v} if k else {}
    temp = []
    while d['related']:
        rel = d['related'].pop()
        temp.append({
            'title': rel,
            'imgurl': get_thumbnail_url(rel, gthumb_key)})
    d['related'] = temp
    return d


def main():
    url = get_wiki_url('Machine Learning')
    print(f'URL IS: {url}')
    res = wiki2dict(url)
    print(res)


if __name__ == '__main__':
    main()
