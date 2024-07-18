import { marked } from "marked";

const markdownRenderer = (markdownContent) => {
  return marked(markdownContent);
};

export default markdownRenderer;
