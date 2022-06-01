import { autocomplete } from '@algolia/autocomplete-js';

function getParts(id) {
  let tag = id.match(/title=(.+)&url=(.+)&author=(.+)&year=(.+)&type=(.+)/);
  return {
    'title': tag[1],
    'url': tag[2],
    'author': tag[3],
    'year': tag[4],
    'type': tag[5],
  }
}

autocomplete({
  container: '#autocomplete',
  placeholder: 'Search topics or keywords',
  debug: false,
  defaultActiveItemId: 0,
  getSources({ query }) {
    return fetch(`https://vale.sh/.netlify/functions/search?q=${query}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      return [
          {
            sourceId: 'predictions',
            getItemUrl({ item }) {
              const parsed = getParts(item.ID);
              return parsed.url;
            },
            getItems() {
              return data || [];
            },
            templates: {
              noResults() {
                return 'No results.';
              },
              item({ item, html }) {
                const parsed = getParts(item.ID);
                return html`<div class="card text-muted">
                  <div class="card-body">
                    <h5 class="card-title mt-0">${parsed.title}</h5>
                    <p class="card-text pt-2">${item.Fragment}</p>
                    <a href="${parsed.url}" class="stretched-link" target="_blank"></a>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">
                      <span class="badge rounded-pill bg-secondary result-tag"><i class="fas fa-calendar"></i> ${parsed.year}</span>
                      <span class="badge rounded-pill bg-secondary result-tag"><i class="fas fa-user"></i> ${parsed.author}</span>
                      <span class="badge rounded-pill bg-secondary result-tag"><i class="fas fa-tag"></i> ${parsed.type}</span>
                    </small>
                  </div>
                </div>`
              },
            },
          },
        ];
    })
  },
});
