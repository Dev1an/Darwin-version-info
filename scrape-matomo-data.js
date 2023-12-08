import { Octokit } from 'octokit'
import   fetch from 'node-fetch'
import { parse } from 'yaml'
import { writeFileSync } from 'node:fs'

const octokit = new Octokit({
	userAgent: "darwin-version-info-fetcher/1.0.0",
	request: {fetch}
})

const matomoYamlFile = await octokit.rest.repos.getContent({
	mediaType: { format: "raw" },
	owner: 'matomo-org',
	repo: 'device-detector',
	path: 'regexes/oss.yml'
})

const matomoList = parse(matomoYamlFile.data)
const iOSdarwinEntryQuery = entry => entry.name == 'iOS' && entry.hasOwnProperty('versions')
const matomoIOSDarwinEntry = matomoList.find(iOSdarwinEntryQuery)
if (matomoIOSDarwinEntry == undefined) {
	console.error('No darwin list found in matomo file')
	process.exit(1)
}

const removeBackslashes = ({version, regex}) => ({version, regex: regex.replaceAll('\\', '')})
const iOSdarwinList = matomoIOSDarwinEntry.versions.map(removeBackslashes)

const jsList = `// This file was automatically generated (on ${new Date()}) using scraped data from ${matomoYamlFile.url}
export const iOSdarwinList = ${JSON.stringify(iOSdarwinList)}
`

writeFileSync('Darwin-iOS-list.js', jsList)