const changelogData = [
    { date: "September 3, 2024", text: "Announcing Projects on Frontend Roadmap" },
    { date: "August 28, 2024", text: "Build your learning habits with learning streaks" },
    { date: "August 25, 2024", text: "Git and GitHub Roadmap" },
    { date: "August 22, 2024", text: "Submit your project solution and get feedback" },
    { date: "August 15, 2024", text: "Backend Project Ideas" },
    { date: "August 10, 2024", text: "Redis roadmap" },
    { date: "August 1, 2024", text: "Changelog page to help you stay in the loop" },
  ];
  
  const timeline = document.getElementById('timeline');
  
  changelogData.forEach(item => {
    const row = document.createElement('div');
    row.className = 'timeline-row';
  
    const date = document.createElement('div');
    date.className = 'timeline-date';
    date.textContent = item.date;
  
    const dot = document.createElement('div');
    dot.className = 'timeline-dot';
  
    const content = document.createElement('div');
    content.className = 'timeline-content';
    content.textContent = item.text;
  
    row.appendChild(date);
    row.appendChild(dot);
    row.appendChild(content);
  
    timeline.appendChild(row);
  });