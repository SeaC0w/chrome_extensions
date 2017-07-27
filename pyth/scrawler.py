# not sure if should transition to just lxml over BSoup, as I've heard the latter
# can be a little bit slow
from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib import parse
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# helper function that finds the links in a page and returns them as an array
def getLinks(driver, url):
    arr = []
    # gets content of all href attrs in html tags
    driver.get(url)
    for link in driver.find_elements_by_tag_name('a'):
        curr = link.get_attribute('href')
        # specifies which links to follow
        if (curr):
            print(curr)
            #print(curr.find('.') < 0)
            if ((curr != url) and (curr != "/")):
                arr += [parse.urljoin(url, curr)]
    #print(arr)
    return arr

# crawler function: takes a start url, a word to find, and the maximum number
# of pages to search for the word, then crawls the site and its links to
# try to find the word
def crawlers(url, word, maxBounce):
    chr_opt = Options()
    chr_opt.add_extension("../chrome_extensions/project.crx")
    driver = webdriver.Chrome(chrome_options=chr_opt)
    toCheck = getLinks(driver, url)
    #print(toCheck)
    checked = []
    incr = 0
    while ((incr < maxBounce) and (toCheck != [])):
        if ((driver.find_element_by_tag_name('body').text).find(word) > -1):
            #print("Success! The word", word, "was found at", url)
            # terminate crawl if the word is found in its text
            driver.quit()
            return url
        else:
            # otherwise continue crawling after incrementing all variables
            incr += 1
            checked += [url]
            url = toCheck[0]
            toCheck = toCheck[1:]
            for item in getLinks(driver, url):
                if ((item not in toCheck) or (item not in checked)):
                    toCheck += [item]
    driver.quit()
    return False

def crawlTime(url, word, maxBounce):
    chr_opt = Options()
    chr_opt.add_extension("../chrome_extensions/project.crx")
    driver = webdriver.Chrome(chrome_options=chr_opt)
    toCheck = getLinks(driver, url)
    checked = []
    incr = 0
    start = time.perf_counter()
    while ((incr < maxBounce) and (toCheck != [])):
        if ((driver.find_element_by_tag_name('body').text).find(word) > -1):
            print("Success! The word", word, "was found at", url)
            # terminate crawl if the word is found in its text
            driver.quit()
            return (time.perf_counter() - start)
        else:
            # otherwise continue crawling after incrementing all variables
            incr += 1
            checked += [url]
            url = toCheck[0]
            toCheck = toCheck[1:]
            for item in getLinks(driver, url):
                if ((item not in toCheck) or (item not in checked)):
                    toCheck += [item]
    driver.quit()
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
    multiTime(["https://www.dreamhost.com/",
     "http://www.painlessperformance.com/"], "painless", 20)

if __name__ == '__main__':
    main()
