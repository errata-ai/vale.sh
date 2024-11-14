import { micromark } from 'micromark'
import { gfmHtml, gfm } from 'micromark-extension-gfm'

export function mdToHtml(md: string) {
    return micromark(md, {
        extensions: [gfm()],
        htmlExtensions: [gfmHtml()]
    })
}
