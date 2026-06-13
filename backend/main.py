#main
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from bs4 import BeautifulSoup

app = FastAPI()

# React frontend talking to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/api/oer-commons") #null right now but this is the endpoint for the OER Commons courses so looking for fields 
def scrape_commons():
    # (Make sure these match the exact URL words OER Commons uses)
    subjects_to_scrape = ["mathematics", "science", "arts"] 
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    # This will hold ALL subjects
    all_scraped_courses = []

    # Loop through each subject one by one
    for current_subject in subjects_to_scrape:
        print(f"--- DEBUG: Scraping OER Commons for {current_subject}... ---")
        
        # dynamically search for the subject
        url = f"https://oercommons.org/browse?f.general_subject={current_subject}" 
        
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            print(f"DEBUG: Failed to load {current_subject}. Skipping.")
            continue 
            
        soup = BeautifulSoup(response.text, "html.parser")
        course_cards = soup.find_all("article", class_="js-index-item") 

        for card in course_cards:
            try:
                title_tag = card.find("h3") or card.find("h2") or card.find("h4") or card.find("a")
                if not title_tag:
                    continue

                title = title_tag.text.strip()
                if not title:
                    continue

                link_tag = card.find("a")
                link = "https://oercommons.org" + link_tag['href'] if link_tag and link_tag.has_attr('href') else "#"

                
                all_scraped_courses.append({
                    "subject": current_subject, #this is the dynamic subject tag
                    "title": title,
                    "link": link,
                    "source": "OER Commons",
                    "imgsrc": "oer_logo"
                })
                
            except Exception as e:
                continue

    # 5. return the results into a big list
    print(f"--- DEBUG: Finished! Packaged {len(all_scraped_courses)} total OER courses. ---")
    return all_scraped_courses

@app.get("/api/harvard-free")
def scrape_harvard_free():
    url = "https://pll.harvard.edu/catalog/free"

    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    
    response = requests.get(url,headers=headers)

    # If the website blocks you, it will return a status code other than 200. Always check the status code before parsing the webpage.
    if response.status_code != 200:
        return {"error": f"Failed to retrieve the webpage. Status code: {response.status_code}"}
    
    # parse the webpage
    soup = BeautifulSoup(response.text, "html.parser")
    scraped_courses = []

    # Find the specific HTML boxes holding the courses. This is where you need to inspect the webpage and find the right tags and classes.
    course_boxes = soup.find_all("div", class_= "views-row") 

    for card in course_boxes:
        try:
            article = card.find("article")
            if not article:
                continue

            #look for title link inside article or whatever tag you found
            title_tag = article.find("h3") or article.find("h2") or article.find("h4")
            if not title_tag:
                continue

            title = title_tag.text.strip()    
            subject_tag = article.find("div", class_="subject-label") # (You'd have to find the real class)
            real_subject = subject_tag.text.strip().lower() if subject_tag else "general"

            #grab the url anchor tag inside the title tag
            link_tag = article.find("a")
            link =  'https://pll.harvard.edu' + link_tag['href'] if link_tag else "#"

            scraped_courses.append({
                "subject": real_subject,
                "title": title,
                "link": link,
                "source": "Harvard University",
                "imgsrc": "harvard_logo"
            })
        except Exception as e:
            print(f"Error processing a course card: {e}")
            continue

    return scraped_courses