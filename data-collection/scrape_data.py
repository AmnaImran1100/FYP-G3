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

def get_Past_Paper_Links(subject):

    driver = webdriver.Chrome(service=service, options=chrome_options)

    # Load the page
    url = f"{subject}"

    driver.get(url)

    driver.implicitly_wait(20)

    page_source = driver.page_source

    # Use BeautifulSoup to parse the page source
    soup = BeautifulSoup(page_source, "html.parser")

    # Find the div with id 'datafile'
    datafile_div = soup.find('div',attrs= {'id': 'datafile'})

    paper_links = []

    if datafile_div:
        items = datafile_div.find_all('div',attrs= {'class': 'kt-widget4__item item-folder-type'})

        for item in items:
            anchor = item.find('a')
            paper_links.append(past_papers_url+anchor['href'])

    # Close Selenium browser
    driver.quit()

    return paper_links

subjects = get_Subject_Links()
for s in subjects:
    papers = get_Past_Paper_Links(s)
    temp = s.split('/')
    key = temp[len(temp)-1]
    papers_dict[key] = papers
    

def write_dict_to_csv(data, filename, mode="w"):

    # Get the column headers (keys of the dictionary)
    headers = data.keys()

    # Find the maximum number of rows (based on the longest list)
    num_rows = max(len(value) for value in data.values())

    # Open the CSV file in the specified mode ('w' for overwrite or 'a' for append)
    with open(filename, mode=mode, newline="") as file:
        writer = csv.writer(file)
        
        # Write the headers (column names) only if we're overwriting or the file is empty
        if mode == "w":
            writer.writerow(headers)
        
        # Write each row of data, filling missing values with None
        for i in range(num_rows):
            row = [data[key][i] if i < len(data[key]) else None for key in headers]
            writer.writerow(row)

    print(f"Data has been written to {filename}")

write_dict_to_csv(papers_dict,"A-Levels_Past_papers.csv")

import os
from urllib.parse import urljoin
import requests

def csv_to_dict(filename):
   
    data_dict = {}

    with open(filename, mode='r', newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        
        # Get the headers from the first row
        headers = next(reader)
        
        # Initialize the dictionary with headers as keys
        for header in headers:
            data_dict[header] = []

        # Populate the dictionary with values from each row
        for row in reader:
            for header, value in zip(headers, row):
                data_dict[header].append(value)

    return data_dict

filename = 'A-Levels_Past_papers.csv'  # Replace with your CSV file path
data = csv_to_dict(filename)

def get_download_links(url):
    
    try:

        driver = webdriver.Chrome(service=service, options=chrome_options)

        driver.get(url)

        driver.implicitly_wait(20)

        page_source = driver.page_source

        # Use BeautifulSoup to parse the page source
        soup = BeautifulSoup(page_source, "html.parser")

        # Find the div with id 'datafile'
        datafile_div = soup.find('div',attrs= {'id': 'datafile'})

        pdf_links = []
        if datafile_div:
            items = datafile_div.find_all('a',attrs= {'class': 'badge badge-info'})

            for item in items:
                pdf_links.append(item['href'].split('=')[1])

        # Close Selenium browser
        driver.quit()

        return pdf_links
    except:
        return []
        


