/**
 * The generator's options, built from the two datasets the site already has
 * rather than from hand-written blurbs.
 *
 * `packages.json` is what the Style Explorer runs on: the real description,
 * the real rule list, and the severity each rule fires at. `config-stats.json`
 * is what 55 public `.vale.ini` files in the adopters list actually select.
 *
 * Between them a visitor can answer the question the tool exists for -- which
 * of these should I pick? -- instead of choosing from an alphabetical list.
 */
import packages from '$lib/data/packages.json';
import stats from '$lib/data/config-stats.json';

export type Level = 'error' | 'warning' | 'suggestion';

export type Option = {
	/** The name Vale installs the package under, and the `Packages` entry. */
	value: string;
	label: string;
	description: string;
	/** Rules in the package, and how many fire at each level. */
	ruleCount: number;
	levels: Record<Level, number>;
	/** How many of the sampled public configs select it. */
	adoption: number;
	/** The styles it most often appears alongside, commonest first. */
	pairedWith: { name: string; count: number }[];
	/** Its Style Explorer page, when the package is one we index. */
	explorer: string | null;
	/** Where the style comes from: the guide or the repository behind it. */
	homepage: string | null;
	/** The mark the Explorer shows for it. */
	logo: string | null;
};

type Pkg = {
	name: string;
	description: string;
	homepage: string;
	tags?: string[];
	logo?: string;
	rules?: { level?: string }[];
};

const byName = new Map((packages as Pkg[]).map((p) => [p.name.toLowerCase(), p]));

const styleCounts = stats.styles as Record<string, number>;
const pairs = stats.pairedWith as Record<string, Record<string, number>>;

/** The size of the sample every adoption count is measured against. */
export const sampleSize = stats.sampleSize;
export const adopterCount = stats.adopterCount;

function build(value: string, fallback: string): Option {
	const pkg = byName.get(value.toLowerCase());
	const rules = pkg?.rules ?? [];

	const levels: Record<Level, number> = { error: 0, warning: 0, suggestion: 0 };
	for (const rule of rules) {
		const level = rule.level as Level | undefined;
		if (level && level in levels) levels[level] += 1;
	}

	return {
		value,
		label: value,
		description: fallback,
		ruleCount: rules.length,
		levels,
		adoption: styleCounts[value] ?? 0,
		pairedWith: Object.entries(pairs[value] ?? {})
			.filter(([, count]) => count > 1)
			.slice(0, 2)
			.map(([name, count]) => ({ name, count })),
		explorer: pkg ? `/explorer/${pkg.name}` : null,
		homepage: pkg?.homepage ?? null,
		logo: pkg?.logo ?? null
	};
}

/** Most-selected first, so the ordering carries information of its own. */
const byAdoption = (a: Option, b: Option) =>
	b.adoption - a.adoption || b.ruleCount - a.ruleCount || a.label.localeCompare(b.label);

/**
 * A complete house style guide. Picking two of these is usually a mistake --
 * they disagree -- so the step takes one.
 */
export const baseStyles: Option[] = [
	build(
		'Google',
		'Google’s developer documentation style: second person, active voice, sentence-case headings, plain words.'
	),
	build(
		'Microsoft',
		'Microsoft’s writing style: warm and direct, contractions welcome, no jargon.'
	),
	build(
		'RedHat',
		'Red Hat’s documentation style: precise terminology and consistent formatting for technical content.'
	),
	build('Elastic', 'Elastic’s documentation style, written for product and reference docs.'),
	build('Salesforce', 'Salesforce’s documentation style, written for product help and reference.')
].sort(byAdoption);

/** Narrow, single-purpose styles meant to sit on top of a base. */
export const supplementaryStyles: Option[] = [
	build('write-good', 'Weasel words, passive voice, clichés, and other loose writing.'),
	build('proselint', 'Redundancy, jargon, dated phrases, and other common style slips.'),
	build('alex', 'Insensitive or inconsiderate wording, with gentler alternatives.'),
	build(
		'Readability',
		'Reading-level scores, so a hard passage is flagged rather than guessed at.'
	),
	build('neighbor', 'Exclusionary language, and the inclusive terms to use instead.'),
	build('Joblint', 'Biased or exclusionary language in job posts.')
].sort(byAdoption);

/** Markup support rather than prose rules: no rules of their own. */
export const configs: Option[] = [
	build('Hugo', 'Support for Hugo shortcodes and front matter.'),
	build('MDX', 'Support for MDX (Markdown with embedded JSX).')
];

export type LevelOption = { value: Level; label: string; description: string; adoption: number };

/** What Vale reports. Everything below the level chosen is hidden. */
export const alertLevels: LevelOption[] = (
	[
		{
			value: 'suggestion',
			label: 'Suggestion',
			description: 'Report everything. The loudest setting, and the usual starting point.'
		},
		{
			value: 'warning',
			label: 'Warning',
			description: 'Hide suggestions. A quieter first run on an existing corpus.'
		},
		{
			value: 'error',
			label: 'Error',
			description: 'Only what a style calls an error. Common when the run gates a build.'
		}
	] as const
).map((l) => ({
	...l,
	adoption: (stats.minAlertLevels as Record<string, number>)[l.value] ?? 0
}));
