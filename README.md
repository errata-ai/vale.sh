# vale.sh [![Netlify Status](https://api.netlify.com/api/v1/badges/6b41c018-35db-4ab5-ba7f-ba23bec59fc3/deploy-status)](https://app.netlify.com/sites/eclectic-semifreddo-be083c/deploys)

Website and documentation for all things Vale.

## Contributing

### Docs

The documentation is written in Markdown and is located in the
`src/lib/content` directory. To contribute, simply edit the appropriate file
and submit a pull request.

### Media

If you have a blog post, video, presentation, or any other media related to
Vale that you'd like to share, please submit a pull request to the
[`library`][1] repository.

### Packages & Configurations

If you have a Vale package or configuration that you'd like to share, please
submit a pull request to the [`packages`][2] repository.

### Implementations

If you an implementation of Vale that you'd like to share, please submit a
pull request that:

- [x] Adds an SVG-formatted logo to `static/users` directory.
- [x] Adds an entry to the `src/lib/config/users.ts` file. The value of the
      `name` field should be the same as the filename of the logo (without the
      `.svg` extension).

## Developing

To start a development server:

```bash
$ pnpm install
$ pnpm run dev -- --open
```

[1]: https://github.com/errata-ai/library
[2]: https://github.com/errata-ai/packages
