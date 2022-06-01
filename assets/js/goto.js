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
              return getParts(item.ID).url;
            },
            getItems() {
              return data || [];
            },
            templates: {
              noResults({ html }) {
                return html`<div class="p-0 text-muted">
                  <h3 class="mt-0">No results found.</h3>
                  <p>Try adjusting your search with a <a href="https://github.com/errata-ai/library/blob/main/README.md#searching" target="_blank">query string</a>:</p>
                  <ul>
                    <li class="pt-2 pb-2">Faceted search: <code>date:>2021</code> or <code>author:jdkato</code></li>
                    <li class="pt-2 pb-2">Fuzzy search: <code>term~1</code> or <code>term~2</code></li>
                    <li class="pt-2 pb-2">Boosted search: <code>text:neovim title:nemvim^5</code></li>
                    <li class="pt-2 pb-2">Regex search: <code>author:/(jdkato|another)/</code></li>
                  </ul>
                  <p>If you're still having trouble, feel free to ask a <a href="https://github.com/errata-ai/vale/discussions" target="_blank">question on GitHub</a>.</p>
                </div>`;
              },
              item({ item, html, createElement }) {
                const parsed = getParts(item.ID);
                const sample = createElement('p', {
                  dangerouslySetInnerHTML: {__html: item.Fragment},
                });
                return html`<div class="card text-muted">
                  <div class="card-body">
                    <h5 class="card-title mt-0">${parsed.title}</h5>
                    <p class="card-text pt-2"><small>${sample}</small></p>
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
