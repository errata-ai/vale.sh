import { autocomplete } from '@algolia/autocomplete-js';
import {parse} from 'query-string';

autocomplete({
  container: '#autocomplete',
  placeholder: 'Search topics or keywords ...',
  debug: false,
  getSources({ query }) {
    return fetch(`https://vale.sh/.netlify/functions/search?q=${query}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      return [
          {
            sourceId: 'predictions',
            getItems() {
              return data || [];
            },
            templates: {
              noResults() {
                return 'No results.';
              },
              item({ item, html }) {
                const parsed = parse(item.ID);
                return html`<div class="card text-muted">
                  <div class="card-body">
                    <h5 class="card-title mt-0">${parsed.title}</h5>
                    <h6 class="card-subtitle pb-2">
                      <span class="badge rounded-pill bg-secondary result-tag"><i class="fas fa-calendar"></i> ${parsed.year}</span>
                      <span class="badge rounded-pill bg-secondary result-tag"><i class="fas fa-user"></i> ${parsed.author}</span>
                    </h6>
                    <p class="card-text">${item.Fragment}</p>
                    <a href="${parsed.url}" class="stretched-link" target="_blank"></a>
                  </div>
                </div>`
              },
            },
          },
        ];
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  },
});
