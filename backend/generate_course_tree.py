import re

from bs4 import BeautifulSoup
from urllib.parse import urljoin
from urllib.request import urlopen


def print_ctree(ctree: dict, depth: int=0, seen=None) -> None:
    for course in ctree:
        print(f'{"  " * depth}{course}')
        for prereq in ctree[course]:
            print_ctree(prereq, depth+1)


def ctree_nodups(ctree: dict, seen=None) -> dict:
    res = {}
    if seen is None:
        seen = set()
    for course in ctree:
        if course not in seen:
            seen.add(course)
            res[course] = [ctree_nodups(prereq, seen) for prereq in ctree[course] if prereq]
    return res


def gen_ctree(course_url: str) -> dict:
    res = {}
    with urlopen(course_url) as httpresp:
        bs = BeautifulSoup(httpresp, 'html.parser')
    title = bs.find('h1').get_text()
    title = ' '.join(title.split()[1:])
    title = re.sub(r'\sfor\s.*$', '', title)
    res[title] = []
    prereqs = bs.find('div', {'class': re.compile(r'prerequisite')})
    if prereqs is not None:
        for prereq in prereqs.find_all('a', href=True):
            url = urljoin(course_url, prereq['href'])
            if course_url != url:
                res[title].append(gen_ctree(url))
    return res


def main():
    import json

    with open('data.json', 'r') as f:
        prog2clinks = json.load(f)
    
    ctrees = {}
    for program in prog2clinks:
        for courselink in prog2clinks[program]:
            print(courselink)
            ctree = gen_ctree(courselink)
            ctree = ctree_nodups(ctree)
            for c in ctree:
                ctrees[c] = ctree[c]
    
    with open('ctrees.txt', 'w') as f:
        json.dump(ctrees, f)


if __name__ == '__main__':
    main()
