import { autocomplete } from '@algolia/autocomplete-js';

autocomplete({
  container: '#autocomplete',
  placeholder: 'Search topics or keywords ...',
  debug: true,
  autoFocus: true,
  defaultActiveItemId: 0,
  shouldPanelOpen: false,
  getSources() {
    return [
      {
        sourceId: 'links',
        getItems({ query }) {
          return sources.filter(({ title, tags }) =>
            title.toLowerCase().includes(query.toLowerCase()) || tags.toLowerCase().includes(query.toLowerCase())
          );
        },
        getItemUrl({ item }) {
          return item.href;
        },
        templates: {
          noResults() {
            return 'No results.';
          },
          /*header() {
            return 'Suggestions';
          },*/
          item({ item, html }) {
            return html`<div class="card text-muted">
              <div class="card-body">
                <h5 class="card-title mt-0">${item.title}</h5>
                <h6 class="card-subtitle">
                  <span class="badge rounded-pill bg-secondary result-tag"><i class="fas fa-calendar"></i> ${item.year}</span>
                  <span class="badge rounded-pill bg-secondary result-tag"><i class="fas fa-user"></i> ${item.author}</span>
                </h6>
              </div>
            </div>`;
          },
          /*footer() {
            return 'Footer';
          },*/
        },
      },
    ];
  },
});
