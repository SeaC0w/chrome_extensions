# not sure if should transition to just lxml over BSoup, as I've heard the latter
# can be a little bit slow
from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib import parse
import time

# helper function that finds the links in a page and returns them as an array
def getLinks(bsoup, url):
    arr = []
    # gets content of all href attrs in html tags
    for link in bsoup.find_all('a'):
        curr = link.get('href')
        # specifies which links to follow
        if (curr):
            if ((curr.find('.') < 0) and (curr != url) and (curr != "/")):
                arr += [parse.urljoin(url, curr)]
    return arr

# crawler function: takes a start url, a word to find, and the maximum number
# of pages to search for the word, then crawls the site and its links to
# try to find the word
def crawlers(url, word, maxBounce):
    fp = urlopen(url)
    soup = BeautifulSoup(fp, "lxml")
    toCheck = getLinks(soup, url)
    checked = []
    incr = 0
    while ((incr < maxBounce) and (toCheck != [])):
        if (soup.get_text().find(word) > -1):
            #print("Success! The word", word, "was found at", url)
            # terminate crawl if the word is found in its text
            return url
        else:
            # otherwise continue crawling after incrementing all variables
            incr += 1
            checked += [url]
            url = toCheck[0]
            toCheck = toCheck[1:]
            soup = BeautifulSoup(urlopen(url), "lxml")
            for item in getLinks(soup, url):
                if ((item not in toCheck) or (item not in checked)):
                    toCheck += [item]
    return False

def crawlTime(url, word, maxBounce):
    fp = urlopen(url)
    soup = BeautifulSoup(fp, "lxml")
    toCheck = getLinks(soup, url)
    checked = []
    incr = 0
    start = time.perf_counter()
    while ((incr < maxBounce) and (toCheck != [])):
        if (soup.get_text().find(word) > -1):
            print("Success! The word", word, "was found at", url)
            # terminate crawl if the word is found in its text
            return (time.perf_counter() - start)
        else:
            # otherwise continue crawling after incrementing all variables
            incr += 1
            checked += [url]
            url = toCheck[0]
            toCheck = toCheck[1:]
            soup = BeautifulSoup(urlopen(url), "lxml")
            for item in getLinks(soup, url):
                if ((item not in toCheck) or (item not in checked)):
                    toCheck += [item]
    return (time.perf_counter() - start)

# currently not in use, allows for only one failure message instead of a lot
def myCall(url, word, maxBounce):
    x = crawlers(url, word, maxBounce)
    if (not x):
        #print("Failure! The word", word, "was never found")
        return False
    else:
        return x

# allows calling of crawler on array of sites, returns dictionary with format
# keys = initial url, values = url where word was located
def multiCall(urls, word, maxBounce):
    found = {}
    for url in urls:
        x = crawlers(url, word, maxBounce)
        if (x):
            found[url] = x
    print(found)

def multiTime(urls, word, maxBounce):
    times = {}
    for url in urls:
        times[url] = str(crawlTime(url, word, maxBounce)) + " sec"
    print(times)

def main():
    multiTime(["https://www.dreamhost.com/", "http://www.thesaurus.com/browse/painless",
     "http://www.painlessperformance.com/"], "painless", 20)

if __name__ == '__main__':
    main()
