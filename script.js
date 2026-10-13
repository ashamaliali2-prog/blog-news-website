const stories = [
  {id:1,category:"Technology",date:"Oct 11, 2026",read:"4 min read",title:"How small AI tools are changing everyday work",summary:"A practical look at how people use new digital tools to brainstorm, organize tasks, and learn faster.",visual:"tech",word:"AI / NOW",body:"Artificial intelligence tools are becoming part of everyday workflows. They can help people brainstorm, summarize information, organize ideas, and practice new skills. The best results come when people check the output carefully, protect private information, and use AI as an assistant rather than a replacement for their own judgment. Start with one small task, compare the result with your usual process, and keep the methods that genuinely help."},
  {id:2,category:"Business",date:"Oct 10, 2026",read:"5 min read",title:"A simple guide to building a memorable brand",summary:"From a clear message to consistent visuals, these basics can help a new business feel recognizable.",visual:"business",word:"BRAND",body:"A strong brand starts with clarity. Decide who you serve, what problem you help solve, and what makes your approach useful. Choose a readable name, a small color palette, and a visual identity that works at different sizes. Consistency across your website, social profiles, and customer messages helps people recognize you. A good brand is not only a logo; it is the experience people remember."},
  {id:3,category:"Sports",date:"Oct 9, 2026",read:"3 min read",title:"What makes a great sports story?",summary:"The moments behind the score often tell us as much as the final result.",visual:"sports",word:"GAME ON",body:"Sports stories are about more than numbers on a scoreboard. Preparation, teamwork, setbacks, strategy, and the atmosphere around a match can all help explain why a moment matters. When writing about a match, check the score and key details against reliable sources, separate confirmed facts from opinion, and give readers enough context to understand the result."},
  {id:4,category:"Lifestyle",date:"Oct 8, 2026",read:"4 min read",title:"Small routines that make a busy day feel lighter",summary:"A few realistic habits can help you bring more focus and calm to a packed schedule.",visual:"lifestyle",word:"SLOW DOWN",body:"A manageable routine should fit your real life. Try choosing three priorities for the day, preparing the first task before you begin, and taking short breaks between demanding activities. Keep your plan flexible: unexpected things happen, and a useful routine should make life easier rather than create more pressure. Review what worked at the end of the week and adjust one thing at a time."},
  {id:5,category:"Ideas",date:"Oct 7, 2026",read:"6 min read",title:"Why asking better questions leads to better ideas",summary:"Curiosity can help you see familiar problems from a fresh angle and find useful answers.",visual:"ideas",word:"WHY?",body:"Better questions make room for better thinking. Instead of asking only whether something works, ask who it helps, what assumptions it relies on, and what evidence would change your mind. Write down several possible answers before choosing one. For reporting and research, use trustworthy sources and look for evidence that challenges your first impression."},
  {id:6,category:"Technology",date:"Oct 6, 2026",read:"5 min read",title:"Digital skills worth practicing this year",summary:"Communication, research, design, and basic data skills can support many different career paths.",visual:"world",word:"SKILLS",body:"Useful digital skills include clear writing, visual communication, spreadsheet basics, online research, and understanding privacy and security. You do not need to learn everything at once. Pick a small project, practice regularly, ask for feedback, and save examples of your work. A portfolio that demonstrates what you can do is often more helpful than a long list of tools."},
  {id:7,category:"Business",date:"Oct 5, 2026",read:"4 min read",title:"Freelancing: how to present your work clearly",summary:"A focused portfolio and clear project descriptions make it easier for clients to understand your value.",visual:"business",word:"CREATE",body:"A useful freelance portfolio shows a few relevant projects, explains the problem each project solves, and makes it easy to contact you. Be honest about your role and experience. Define deliverables, timing, and revisions before starting a project. Start with a manageable scope, communicate clearly, and ask satisfied clients for permission to share finished work."},
  {id:8,category:"Sports",date:"Oct 4, 2026",read:"3 min read",title:"The details fans remember after a big match",summary:"Skill, momentum, and decision-making can turn one passage of play into a lasting memory.",visual:"sports",word:"MOMENT",body:"Fans often remember the small details around a big result: a brave decision, a calm response under pressure, or a team changing its plan at the right time. A good sports recap explains the turning points without exaggerating. Verify names, figures, and quotes before publishing, and credit original reporting and photography."},
  {id:9,category:"Lifestyle",date:"Oct 3, 2026",read:"4 min read",title:"Make time for learning one thing at a time",summary:"A small, repeatable learning plan can be easier to sustain than trying to master everything at once.",visual:"lifestyle",word:"GROW",body:"Choose one specific skill and define a small outcome you can complete in a week. Practice in short sessions, use reliable learning material, and test yourself by making something. Keep notes about what confused you and revisit those points. Progress is easier to see when you keep examples of your work and reflect on them regularly."}
];

const grid = document.getElementById("storyGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const loadMore = document.getElementById("loadMore");
let activeCategory = "All";
let visibleCount = 6;
let searchTerm = "";

function getFilteredStories() {
  return stories.filter(story => {
    const matchesCategory = activeCategory === "All" || story.category === activeCategory;
    const haystack = `${story.title} ${story.summary} ${story.category} ${story.body}`.toLowerCase();
    return matchesCategory && haystack.includes(searchTerm.toLowerCase());
  });
}

function renderStories() {
  const filtered = getFilteredStories();
  const shown = filtered.slice(0, visibleCount);
  grid.innerHTML = shown.map(story => `
    <article class="story-card">
      <div class="story-visual visual-${story.visual}"><span class="visual-word">${story.word}</span></div>
      <div class="story-body">
        <div class="story-meta"><span class="category">${story.category}</span><span>·</span><span>${story.date}</span><span>·</span><span>${story.read}</span></div>
        <h3>${story.title}</h3><p>${story.summary}</p>
        <button class="read-link" data-read="${story.id}">Read full story ↗</button>
      </div>
    </article>`).join("");
  emptyState.hidden = shown.length !== 0;
  loadMore.hidden = shown.length >= filtered.length || filtered.length === 0;
}

function openArticle(id) {
  const story = stories.find(item => item.id === Number(id));
  if (!story) return;
  document.getElementById("articleContent").innerHTML = `
    <div class="story-meta"><span class="category">${story.category}</span><span>·</span><span>${story.date}</span><span>·</span><span>${story.read}</span></div>
    <h2>${story.title}</h2><p><strong>${story.summary}</strong></p><div class="story-visual visual-${story.visual}" style="height:150px;border-radius:4px"><span class="visual-word">${story.word}</span></div><p>${story.body}</p>
    <p><em>Editor's note: This is sample demonstration content. Replace it with verified, original articles before publishing.</em></p>`;
  document.getElementById("articleDialog").showModal();
}

grid.addEventListener("click", event => {
  const button = event.target.closest("[data-read]");
  if (button) openArticle(button.dataset.read);
});
document.querySelectorAll(".pill").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
    button.classList.add("active");
    activeCategory = button.dataset.category;
    visibleCount = 6;
    renderStories();
  });
});
searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value.trim();
  visibleCount = 6;
  renderStories();
});
loadMore.addEventListener("click", () => { visibleCount += 3; renderStories(); });
document.getElementById("dialogClose").addEventListener("click", () => document.getElementById("articleDialog").close());
document.getElementById("articleDialog").addEventListener("click", event => {
  if (event.target === event.currentTarget) event.currentTarget.close();
});
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.getElementById("themeToggle").textContent = document.body.classList.contains("dark") ? "☀" : "☾";
});
document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.getElementById("mainNav");
  const open = nav.classList.toggle("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", String(open));
});
document.querySelectorAll("#mainNav a").forEach(link => link.addEventListener("click", () => {
  document.getElementById("mainNav").classList.remove("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
}));
document.getElementById("newsletterForm").addEventListener("submit", event => {
  event.preventDefault();
  document.getElementById("newsletterMessage").textContent = "Thanks! This demo does not save emails yet. Connect a mailing service to enable subscriptions.";
  document.getElementById("emailInput").value = "";
});
document.getElementById("today").textContent = new Intl.DateTimeFormat("en", {weekday:"long", year:"numeric", month:"short", day:"numeric"}).format(new Date());
document.getElementById("year").textContent = new Date().getFullYear();
renderStories();
