import React, { useState, useEffect } from "react";
import './subject.css';
import { Card } from './Components/Card';
import harvardImg from './assets/Harvard_University.png';
import oerImg from './assets/oer_commons.png';


/* Placeholder component for the Subjects page which will have fake data which will be replaced with real data from Supabase ONLY SHOWS ID 1 FIX LATER!!!!!
const subjectsData = [
  { id: 1, subject: "Math", title: "Calc 2",description: "lectures on foundational concepts", link: "#", imgsrc: "https://via.placeholder.com/150", imgalt: "Math image" },
  { id: 2, subject: "Science", title: "Biology 101", description: "Lectures on biological principles.", link: "#", imgsrc: "https://via.placeholder.com/150", imgalt: "Science image" },
  { id: 3, subject: "Computer Science", title: "Intro to Programming", description: "Introduction to programming concepts.", link: "#", imgsrc: "https://via.placeholder.com/150", imgalt: "Computer Science image" },
  { id: 4, subject: "Humanities", title: "World History", description: "Overview of world history.", link: "#", imgsrc: "https://via.placeholder.com/150", imgalt: "Humanities image" }
];
*/
export const Subject = () => {
  // track the currently selected subject
  const [activeSubject, setActiveSubject]  = useState("all")
  const [searchQuery, setSearchQuery] = useState("");
  
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

// to merge information
  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        setIsLoading(true);

        //Point directly to your FastAPI Python server
        const[coursesResponse, resourcesResponse] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/harvard-free"),
          fetch("http://127.0.0.1:8000/api/oer-commons")
        ]);

        const coursesData = await coursesResponse.json();
        const resourcesData = await resourcesResponse.json();

        // Use the spread operator (...) to dump all the items into one area
        const combinedData = [...coursesData, ...resourcesData];
        setResources(combinedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchAllCourses();
  }, []);

  // filter the subjects based on the search query
  const filteredResources = resources.filter(sub => {
    const matchSubject = activeSubject === "all" ||
                        sub.subject?.toLowerCase().includes(activeSubject.toLowerCase()) || 
                        sub.source?.toLowerCase().includes(activeSubject.toLowerCase());

    const matchesSearch = sub.title?.toLowerCase().includes(searchQuery.toLowerCase());          

    return matchSubject && matchesSearch;
  });

return (
  <div className="subject-page-container">
    {/*Subject selection buttons */}
    <aside className="subject-sidebar">
      <h3>Study Lab</h3>
      <ul className="sidebar-menu">
       <li className={activeSubject === "all" ? "active-tab" : ""} onClick={() => { setActiveSubject("all"); setSearchQuery(""); }}>🏫 All Subjects</li>
       <li className={activeSubject === "math" ? "active-tab" : ""} onClick={() => { setActiveSubject("math"); setSearchQuery(""); }}>📐 Mathematics</li>
       <li className={activeSubject === "science" ? "active-tab" : ""} onClick={() => { setActiveSubject("science"); setSearchQuery(""); }}>🧪 Science</li>
       <li className={activeSubject === "cs" ? "active-tab" : ""} onClick={() => { setActiveSubject("cs"); setSearchQuery(""); }}>💻 Computer Science</li>
       <li className={activeSubject === "humanities" ? "active-tab" : ""} onClick={() => { setActiveSubject("humanities"); setSearchQuery(""); }}>📖 Humanities</li>
        </ul>
      </aside>

      {/* right main lab panel*/ }
      <main className="resource-panel"> 

         {/*Search bar*/ }
         <header className="panel-header">
          <div>
            <h1>{activeSubject.toUpperCase()} STUDIO</h1>
            <p>Showing {filteredResources.length} verified educational modules</p>
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder =  "Search concepts, lectures, and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
         </header>

          {/* Content box dhjowing resource cards*/ }
          <div className="resource-sub-grid">
          {isLoading ? (
            <div className="loading">Loading resources...</div>
          ) : filteredResources.length > 0 ? (
            filteredResources.map((res, index) => {
              
              // where to display images based off of where i got it
              let displayImage = "https://placehold.co/400x200?text=Course"; 
              if (res.imgsrc === "harvard_logo") displayImage = harvardImg;
              if (res.imgsrc === "oer_logo") displayImage = oerImg;

              // RETURN STATEMENT
              return (
                <Card 
                  key={index}
                  title={res.title}
                  description={res.source}
                  imgsrc={displayImage} 
                  imgalt={res.title}
                  link={res.link}
                />
              );
              
            }) // 
          ) : (
            <div className="no-results">
              <p className="no-results">No resources found.</p>
            </div>
          )}
        </div>
    </main>
  </div>
    );
  };

export default Subject