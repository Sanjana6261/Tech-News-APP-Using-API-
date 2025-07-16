const apiKey = 'e61bdd3cb54040ba995084c1df29c81c';
const url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`;

async function fetchNews() {
  const container = document.getElementById('news-container');
  container.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch news");
    const data = await res.json();

    container.innerHTML = ""; // Clear loading text

    data.articles.forEach(article => {
      const card = document.createElement('div');
      card.className = 'news-card';

      const image = article.urlToImage || 'https://via.placeholder.com/800x400?text=No+Image';
      const title = article.title || 'No title';
      const desc = article.description || 'No description available';
      const author = article.author || 'Unknown';
      const date = new Date(article.publishedAt).toLocaleString();
      const url = article.url;

      card.innerHTML = `
        <img src="${image}" alt="News Image" />
        <div class="news-content">
          <div class="news-title">${title}</div>
          <div class="news-meta">By ${author} | ${date}</div>
          <div class="news-description">${desc}</div>
          <a class="read-more" href="${url}" target="_blank">Read More</a>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

fetchNews();
