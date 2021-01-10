import re
import requests
import bs4

from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib.parse import urljoin
from typing import Dict, List


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
    res['text'] = firstpar.get_text()

    # First search in firstpar for related:
    res['related'] = external_link_texts(firstpar.find_all('a', href=True))
    # Search in article's first table for related:
    for div in table.find_all('div', {'class': 'NavHead'}):
        res['related'] += external_link_texts(div.find_all('a', href=True))
    return res


def get_wiki_url(search_term: str) -> str:
    S = requests.Session()

    URL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=pageimages|info|extracts&exintro&explaintext&redirects=1&pithumbsize=1000&inprop=url&titles=' + search_term

    R = S.get(url=URL)
    DATA = R.json()
    PAGES = DATA['query']['pages']
    if '-1' not in PAGES:
        return PAGES[list(PAGES.keys())[0]]['fullurl']


def get_utube_links(search_term: str) -> str:
    S = requests.Session()

    URL = '%s%s%s' % ('https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=',
                      search_term, '&key=AIzaSyCA1zvAvILXKNkTpD_4SmkpVDouZ5wFwyw')

    R = S.get(url=URL)
    DATA = R.json()
    # print(DATA)

    return ['%s%s' % ('https://www.youtube.com/watch?v=', item["id"]["videoId"]) for item in DATA["items"]]


def get_books(search_term):
    S = requests.Session()

    URL = '%s%s' % (
        'https://www.googleapis.com/books/v1/volumes?q=', search_term)

    R = S.get(url=URL)
    DATA = R.json()

    output = []
    for item in DATA["items"]:
        result = {}
        result['title'] = item["volumeInfo"]["title"]
        result['authors'] = item["volumeInfo"]["authors"]
        result['thumbnail_uri'] = item["volumeInfo"]["imageLinks"]["thumbnail"]
        output.append(result)
    return output


def get_thumbnail_url(search_term):
    start_idx = '1'
    key = 'AIzaSyCA1zvAvILXKNkTpD_4SmkpVDouZ5wFwyw'
    cx = 'ae77ccce312b12d27'
    search_url = f'https://www.googleapis.com/customsearch/v1?q={search_term}&start={start_idx}&key={key}&cx={cx}&searchType=image'
    r = requests.get(search_url)
    response = r.content.decode('utf-8')
    result = json.loads(response)
    if len(result['items']):
        return result['items'][0]['link']


def main():
    url = get_wiki_url('Machine Learnin')
    print(f'URL IS: {url}')
    res = wiki2dict(url)
    print(res)


if __name__ == '__main__':
    main()
