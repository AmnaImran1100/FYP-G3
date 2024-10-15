from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options 
import csv
from concurrent.futures import ThreadPoolExecutor

from itertools import islice

# Set up Selenium with headless Chrome 
chrome_options = Options() 
#chrome_options.add_argument("--headless") 
chrome_driver_path = "chromedriver.exe"
service = Service(chrome_driver_path)

driver = webdriver.Chrome(service=service, options=chrome_options)


past_papers_url = "https://pastpapers.papacambridge.com/"

papers_dict = {}



def get_Subject_Links():

    driver = webdriver.Chrome(service=service, options=chrome_options)

    # Load the page
    url = f"{past_papers_url}papers/caie/as-and-a-level"

    driver.get(url)

    driver.implicitly_wait(20)

    page_source = driver.page_source

    # Use BeautifulSoup to parse the page source
    soup = BeautifulSoup(page_source, "html.parser")

    # Find the div with id 'datafile'
    datafile_div = soup.find('div',attrs= {'id': 'datafile'})

    # Check for matching links inside the div
    keywords = ['computer-science', 'physics', 'chemistry', 'biology','mathematics']
    matching_hrefs = []

    if datafile_div:
        items = datafile_div.find_all('div',attrs= {'class': 'kt-widget4__item item-folder-type'})

        for item in items:
            anchor = item.find('a')
            if anchor and any(keyword in anchor['href'] for keyword in keywords):
                matching_hrefs.append(past_papers_url+anchor['href'])

    driver.close()

    return matching_hrefs


        


