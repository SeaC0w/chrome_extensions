from html.parser import HTMLParser
from urllib.request import urlopen
from urllib import parse
from bs4 import BeautifulSoup

# create a subclass and override the handler methods
class MyHTMLParser(HTMLParser):
    def handle_starttag(self, tag, attrs):
        # checks if the tag is a link
        if (tag == 'a'):
            # looks in attributes of the html tag
            for (key, value) in attrs:
                # if there is a link, creates a new relative url using that link
                if (key == 'href'):
                    self.links += [parse.urljoin(self.baseUrl, value)]

    def findLinks(self, url):
        # allows later methods to access important data
        self.links = []
        self.baseUrl = url
        # opens a url, generating a response
        response = urlopen(url)
        # check to see if the format of the page is html
        if (response.getheader('Content-Type') == 'text/html'):
            # read the response
            original = response.read()
            # convert the read response into a usable string
            htmlStr = original.decode("utf-8")
            # feed the string to the parser, in the process modifying links
            self.feed(htmlStr)
            # return both the data and the links
            return(htmlStr, self.links)
        # if the page is of the wrong format, ignore it
        else:
            return("", [])


    # def handle_endtag(self, tag):
    #     print ("Encountered an end tag :", tag)
    #
    # def handle_data(self, data):
    #     print ("Encountered some data  :", data)

# instantiate the parser and fed it some HTML
#parser = MyHTMLParser()
# parser.feed('<html><head><title>Test</title></head>'
#             '<body><h1>Parse me!</h1><a href="https://www.w3schools.com/html/">'
#             'Visit our HTML tutorial</a></body></html>')
#parser.feed(urlopen("https://edhrec.com/"))

def myCrawl(url, search, maxCheck):
    toCheck = [url]
    numChecked = 0
    wordFound = False
    # errored = False
    while ((numChecked < maxCheck) and (toCheck != []) and (not wordFound)):
        #increment sites checked, get next url, update sites to check
        numChecked += 1
        url = toCheck[0]
        toCheck = toCheck[1:]
        # check if the word is in the data of the current site
        # stop while loop if it is, continue to next page if not
        # send error message if error occurs
        # try:
        print("Bounce", numChecked, "Visiting:", url)
        parser = MyHTMLParser()
        # retrieve data and links using our modified version of HTMLparser
        data, links = parser.findLinks(url)
        if (data.find(search) > -1):
            wordFound = True
            print("Success!")
        else:
            toCheck += links
        # except:
        #     print("Error occured")
        #     errored = True
    # after while loop finishes, print the result of the search
    if (wordFound):
        print("The word", search, "was found at", url)
    else:
        print("The word '", search, "' was never found")
    # else:
    #     print("The error occured at url:", url)


def main():
    myCrawl("http://www.dreamhost.com", "lolwut", 50)

if __name__ == '__main__':
    main()
