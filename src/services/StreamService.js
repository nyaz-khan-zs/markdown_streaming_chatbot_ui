// Simulated stream service
export const fetchMarkdownContent = async () => {
  const response = await fetch(
    "https://gist.githubusercontent.com/joyanujoy/56719bddd3e0ef9f8efba4aa0aa9dc39/raw/0024f0e97e26c6cd447ae8c4c963c96423b59136/beaver.md"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Markdown file");
  }
  console.log(response);
  const markdownText = await response.text();
  return markdownText;
};
