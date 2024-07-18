import React, { useState, useEffect, useRef } from "react";
import "./styles/ChatDisplay.css";
import ControlPanel from "./ControlPanel";
import { fetchMarkdownContent } from "./services/StreamService";
import markdownRenderer from "./utils/markdownRenderer";

const ChatDisplay = () => {
  let [markdownContent, setMarkdownContent] = useState("");
  const [isReading, setIsReading] = useState(false);
  let [currentIndex, setCurrentIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [content, setContent] = useState("");
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        let markdownText = await fetchMarkdownContent();
        setContent(markdownText);
        startReading();
      } catch (error) {
        console.error("Error fetching Markdown file:", error);
      }
    };

    fetchMarkdown();
  }, []);

  const startReading = () => {
    if (!isReading) {
      setIsReading(true);
      const id = setInterval(() => {
        if (currentIndex < content.length) {
          setMarkdownContent((markdownContent += content[currentIndex]));
          setCurrentIndex((currentIndex += 1));
          sectionRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
          setIsReading(false);
          clearInterval(id);
        }
      }, 0);
      setIntervalId(id);
    }
  };

  const pauseReading = () => {
    setIsReading(false);
    clearInterval(intervalId);
  };

  const resetReading = () => {
    setIsReading(false);
    setMarkdownContent("");
    setCurrentIndex(0);
    clearInterval(intervalId);
  };

  const handleUserAction = (action) => {
    switch (action) {
      case "start":
        startReading();
        break;
      case "pause":
        pauseReading();
        break;
      case "reset":
        resetReading();
        break;
      default:
        break;
    }
  };

  const markdownToHtml = markdownRenderer(markdownContent);

  return (
    <div className="ChatDisplay">
      <div className="markdown-content-wrapper">
        <div
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: markdownToHtml }}
        ></div>
        <div
          ref={sectionRef}
          className={`typing-animation ${isReading ? "active" : ""}`}
          aria-hidden="true"
        ></div>
      </div>
      <ControlPanel onUserClick={handleUserAction} />
    </div>
  );
};

export default ChatDisplay;
