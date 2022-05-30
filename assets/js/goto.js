import { autocomplete } from '@algolia/autocomplete-js';
import { parse } from 'query-string';

autocomplete({
  container: '#autocomplete',
  placeholder: 'Search topics or keywords ...',
  debug: true,
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
            getItems() {
              return data || [];
            },
            /*onHighlight({ item }) {
            },*/
            onActive({ item, setContext }) {
              const parsed = parse(item.ID);
              fetch(`https://vale.sh/.netlify/functions/preview?url=${parsed.url}`, {
                  method: 'GET',
                })
                .then(response => response.json())
                .then(data => {
                  setContext({ preview: item, og: data});
                })
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
                    <a href="${parsed.url}" class="stretched-link" target="_blank"></a>
                  </div>
                </div>`
              },
            },
          },
        ];
    })
  },
  render({ children, state, render, html }, root) {
    const { preview, og } = state.context;
    if (preview === undefined) {
      return
    }
    const parsed = parse(preview.ID);
    render(html`<div class="aa-PanelLayout aa-Panel--scrollable">
        <div class="aa-PanelSections">
          <div class="aa-PanelSection--left">${children}</div>
            <div class="aa-PanelSection--right">
              <div class="card text-muted mt-2">
                  <img src="${og.Preview.Images[0]}" class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title mt-0">${parsed.title}</h5>
                    <h6 class="card-subtitle pb-2">
                      <span class="badge rounded-pill bg-secondary result-tag"><i class="fas fa-calendar"></i> ${parsed.year}</span>
                      <span class="badge rounded-pill bg-secondary result-tag"><i class="fas fa-user"></i> ${parsed.author}</span>
                    </h6>
                    <p class="card-text pt-2">${preview.Fragment}</p>
                    <a href="${parsed.url}" class="stretched-link" target="_blank"></a>
                  </div>
                  <div class="card-footer">
                      <small class="text-muted">Last updated 3 mins ago</small>
                  </div>
              </div>
          </div>
        </div>
      </div>`, root);
  },
});
