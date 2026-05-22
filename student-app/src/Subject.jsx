import { useState } from "react";
import './subject.css';
import { Card } from './Components/Card';

// Placeholder component for the Subjects page which will have fake data which will be replaced with real data from Supabase ONLY SHOWS ID 1 FIX LATER!!!!!
const subjectsData = [
  { id: 1, subject: "Math", title: "Calc 2",description: "lectures on foundational concepts", link: "#", imgsrc: "https://via.placeholder.com/150", imgalt: "Math image" },
  { id: 2, subject: "Science", title: "Biology 101", description: "Lectures on biological principles.", link: "#", imgsrc: "https://via.placeholder.com/150", imgalt: "Science image" },
  { id: 3, subject: "Computer Science", title: "Intro to Programming", description: "Introduction to programming concepts.", link: "#", imgsrc: "https://via.placeholder.com/150", imgalt: "Computer Science image" },
  { id: 4, subject: "Humanities", title: "World History", description: "Overview of world history.", link: "#", imgsrc: "https://via.placeholder.com/150", imgalt: "Humanities image" }
];

export const Subject = () => {
  // track the currently selected subject
  const [activeSubject, setActiveSubject]  = useState("Math")
  const [searchQuery, setSearchQuery] = useState("");
  
  // filter the subjects based on the search query
  const filteredSubjects = subjectsData.filter(sub => {
    const matchSubject = sub.subject === activeSubject;
    const matchSearch = sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        sub.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubject && matchSearch;
});

return (
  <div className="subject-page-container">
    {/*Subject selection buttons */}
    <aside className="subject-sidebar">
      <h3>Study Lab</h3>
      <ul className="sidebar-menu">
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
            <h1>{activeSubject.toUpperCase()} Studio</h1>
            <p>showing {filteredSubjects.length} resources</p>
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
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map(sub => (
            <Card
              key={sub.id}
              title={sub.title}
              description={sub.description}
              link={sub.link}
              imgsrc={sub.imgsrc}
              imgalt={sub.imgalt}
              link={sub.link}
            />
          ))
          ) : (
            <div className="no-results">
            <p className="no-results">No resources found for "{searchQuery}" in {activeSubject}.</p>
            </div>
          )}
      </div>
    </main>
  </div>
    );
  };

export default Subject