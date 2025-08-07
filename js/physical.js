let planetList = [];

async function fetchPlanets() {
  try {
    const res = await fetch('http://127.0.0.1:5000/api/planets');
    planetList = await res.json();
  } catch (err) {
    console.error('Failed to fetch planet list', err);
  }
}
fetchPlanets();

const searchInput = document.getElementById('planetSearch');
const resultBox = document.getElementById('planetResult');
const suggestionBox = document.getElementById('autocomplete-box');

searchInput.addEventListener('input', () => {
  const val = searchInput.value.toLowerCase();
  if (!val) {
    suggestionBox.innerHTML = '';
    return;
  }

  const suggestions = planetList.filter(p => p.toLowerCase().includes(val)).slice(0, 5);
  suggestionBox.innerHTML = suggestions.map(p => `<div>${p}</div>`).join('');

  suggestionBox.querySelectorAll('div').forEach(item => {
    item.addEventListener('click', () => {
      searchInput.value = item.textContent;
      suggestionBox.innerHTML = '';
      fetchPlanetData(item.textContent);
    });
  });
});

async function fetchPlanetData(planet) {
  try {
    const res = await fetch('http://127.0.0.1:5000/api/exoplanet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planet_name: planet })
    });

    const data = await res.json();
    if (data.error) {
      resultBox.innerHTML = `<p style="color:red;">${data.error}</p>`;
    } else {
      resultBox.innerHTML = `<pre>${data.report}</pre>`;
    }
  } catch (err) {
    resultBox.innerHTML = `<p style="color:red;">Error loading data</p>`;
  }
}

searchInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    suggestionBox.innerHTML = '';
    fetchPlanetData(searchInput.value);
  }
});
