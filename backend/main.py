#main
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from bs4 import BeautifulSoup

# This is the "app" variable uvicorn is looking for!
app = FastAPI()

# This is the security gate for your React frontend to talk to my backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/api/oer-commons") #null right now but this is the endpoint for the OER Commons courses so looking for fields 
def scrape_commons():
    url = "https://oercommons.org/browse?f.general_subject" #might adjust url but as of right now this is the page with all the courses

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return {"error": f"Failed to retrieve the webpage. Status code: {response.status_code}"}
    soup = BeautifulSoup(response.text, "html.parser")

    scraped_oer_courses = []

    course_cards = soup.find_all("div", class_="js-index-item index-item clearfix") #this is the class for each course card

    for card in course_cards:
        try:
            article = card.find("article") 
            if not article:
                continue
            article_tag = article.find("h3") or article.find("h2") or article.find("h4") #look for the title tag inside the article tag
            if not article_tag:
                continue

            title = article_tag.text.strip()

            link_tag = article.find("a")
            link = "https://oercommons.org" + link_tag['href'] if link_tag else "#"

            scraped_oer_courses.append({
                "subject": "OER Commons",
                "title": title,
                "link": link,
                "source": "OER Commons",
                "imgsrc": "https://placehold.co/400x200?text=OER+Course"
            })
        except Exception as e:
            print(f"Error processing a course card: {e}")
            continue

@app.get("/api/harvard-free")
def scrape_harvard_free():
    url = "https://pll.harvard.edu/catalog/free"

    #1. shows the website that you're trying to scrape and not a robot
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    #2. download the webpage
    response = requests.get(url,headers=headers)

    #3. If the website blocks you, it will return a status code other than 200. You can check the status code to see if the request was successful.
    if response.status_code != 200:
        return {"error": f"Failed to retrieve the webpage. Status code: {response.status_code}"}
    
    #4. parse the webpage
    soup = BeautifulSoup(response.text, "html.parser")
    scraped_courses = []

    #5. Find the specific HTML boxes holding the courses. This is where you need to inspect the webpage and find the right tags and classes.
    course_boxes = soup.find_all("div", class_= "views-row") 

    for card in course_boxes:
        try:
            #look for the title, description, and link within each course box. Again, you need to inspect the webpage to find the right tags and classes.
            article = card.find("article")
            if not article:
                continue

            #look for title link inside article or whatever tag you found
            title_tag = article.find("h3") or article.find("h2") or article.find("h4")
            if not title_tag:
                continue

            title = title_tag.text.strip()    

            #grab the url anchor tag inside the title tag
            link_tag = article.find("a")
            link =  'https://pll.harvard.edu' + link_tag['href'] if link_tag else "#"

            scraped_courses.append({
                "subject": "Free Harvard Courses",
                "title": title,
                "link": link,
                "source": "Harvard Online Learning",
                "imgsrc": "https://placehold.co/400x200?text=Harvard+Course"
            })
        except Exception as e:
            print(f"Error processing a course card: {e}")
            continue

    return scraped_courses