import React, { useState } from "react";

const Varsity = () => {
  const [selectedModule, setSelectedModule] = useState(null);

  const modules = [
    {
      id: 1,
      title: "Introduction to Stock Markets",
      lessons: 14,
      duration: "2 hours",
      level: "Beginner",
      description: "Learn the basics of stock markets, how they work, and key concepts you need to know."
    },
    {
      id: 2,
      title: "Technical Analysis",
      lessons: 22,
      duration: "4 hours",
      level: "Intermediate",
      description: "Master chart patterns, indicators, and technical analysis strategies for trading."
    },
    {
      id: 3,
      title: "Fundamental Analysis",
      lessons: 18,
      duration: "3.5 hours",
      level: "Intermediate",
      description: "Understand how to analyze companies, financial statements, and make informed investment decisions."
    },
    {
      id: 4,
      title: "Futures Trading",
      lessons: 16,
      duration: "3 hours",
      level: "Advanced",
      description: "Learn about futures contracts, margin trading, and advanced derivatives strategies."
    },
    {
      id: 5,
      title: "Options Theory",
      lessons: 20,
      duration: "4 hours",
      level: "Advanced",
      description: "Deep dive into options trading, Greeks, and complex options strategies."
    },
    {
      id: 6,
      title: "Risk Management",
      lessons: 12,
      duration: "2 hours",
      level: "Beginner",
      description: "Essential risk management techniques for protecting your capital and trading psychology."
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#333" }}>
        Varsity
      </h2>

      <div
        style={{
          background: "#fff",
          border: "1px solid #e6e6e6",
          borderRadius: "12px",
          padding: "30px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ fontSize: "1.2rem", marginBottom: "15px", color: "#333" }}>
          Stock Market Lessons
        </h3>
        <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
          An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go.
        </p>

        <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
          <div style={{ padding: "15px", background: "#e8f5e9", borderRadius: "8px", flex: "1" }}>
            <h4 style={{ fontSize: "1.5rem", marginBottom: "5px", color: "#2e7d32" }}>100+</h4>
            <p style={{ fontSize: "0.85rem", color: "#666" }}>Lessons</p>
          </div>
          <div style={{ padding: "15px", background: "#e3f2fd", borderRadius: "8px", flex: "1" }}>
            <h4 style={{ fontSize: "1.5rem", marginBottom: "5px", color: "#1565c0" }}>6</h4>
            <p style={{ fontSize: "0.85rem", color: "#666" }}>Modules</p>
          </div>
          <div style={{ padding: "15px", background: "#fff3e0", borderRadius: "8px", flex: "1" }}>
            <h4 style={{ fontSize: "1.5rem", marginBottom: "5px", color: "#e65100" }}>Free</h4>
            <p style={{ fontSize: "0.85rem", color: "#666" }}>Forever</p>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid #e6e6e6",
          borderRadius: "12px",
          padding: "30px",
        }}
      >
        <h3 style={{ fontSize: "1.2rem", marginBottom: "15px", color: "#333" }}>
          Course Modules
        </h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {modules.map((module) => (
            <div
              key={module.id}
              style={{
                padding: "20px",
                border: "1px solid #e6e6e6",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onClick={() => setSelectedModule(module)}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "#4184f3"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e6e6e6"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <span style={{ 
                  padding: "4px 8px", 
                  borderRadius: "4px", 
                  fontSize: "0.75rem",
                  background: module.level === "Beginner" ? "#e8f5e9" : module.level === "Intermediate" ? "#fff3e0" : "#ffebee",
                  color: module.level === "Beginner" ? "#2e7d32" : module.level === "Intermediate" ? "#e65100" : "#c62828"
                }}>
                  {module.level}
                </span>
                <span style={{ fontSize: "0.85rem", color: "#666" }}>{module.duration}</span>
              </div>
              
              <h4 style={{ fontSize: "1rem", marginBottom: "8px", color: "#333" }}>
                {module.title}
              </h4>
              
              <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "10px", lineHeight: "1.4" }}>
                {module.description}
              </p>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.85rem", color: "#666" }}>{module.lessons} lessons</span>
                <span style={{ fontSize: "0.85rem", color: "#4184f3" }}>Start →</span>
              </div>
            </div>
          ))}
        </div>

        {selectedModule && (
          <div style={{ marginTop: "20px", padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
            <h4 style={{ fontSize: "1rem", marginBottom: "10px", color: "#333" }}>
              {selectedModule.title}
            </h4>
            <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "15px" }}>
              {selectedModule.description}
            </p>
            <button
              style={{
                padding: "10px 20px",
                background: "#4184f3",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
              onClick={() => alert(`Starting ${selectedModule.title} - Coming soon!`)}
            >
              Start Learning
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Varsity;
