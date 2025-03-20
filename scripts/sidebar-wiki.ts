import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import fetch from 'node-fetch'

const baseUrl = '/'

// define whether big pages should be built.
// fastBuild should only be used when testing, since it will not compile some of the wikis content.
const excludeFiles = [
    'entities/vanilla-usage-components.md',
    'entities/vanilla-usage-spawn-rules.md',
    'entities/vuc-full.md',
    'entities/vusr-full.md',
]

const fastBuild = process.env.fastBuild === 'true ' // SPACE has to be there, since the SET var=val command adds a space at the end!

if (fastBuild && process.env.NODE_ENV == 'production') {
    console.log(
        `\nINFO: fastBuild selected. the files:\n${JSON.stringify(
            excludeFiles,
            null,
            4
        )}\nwill not be compiled!\n`
    )
}

function formatLink(path: string) {
    return path.split(/\\|\//g).join('/').replace('.md', '')
}

/*
Gets the categories from within the frontmatter of an index.md file, and returns them as list.
 */
function getCategoryOrder(frontMatter: matter.GrayMatterFile<string>) {
    const data: { [Key: string]: number } = {}
    if (!frontMatter.data.categories) {
        return data
    }

    frontMatter.data.categories.forEach(function (
        category: { title: string | number },
        index: number
    ) {
        data[category.title] = index + 1
    })

    return data
}

function getCategories(frontMatter: matter.GrayMatterFile<string>) {
    const data: {
        text: any
        data: any
        tags: any
        prefix: any
        section: boolean
        color: any
        link: string
        activeMatch: string
    }[] = []
    if (!frontMatter.data.categories) {
        return data
    }

    frontMatter.data.categories.forEach(function (
        category: {
            nav_order: number
            category: any
            title: any
            tags: any
            prefix: any
            color: any
        },
        index: any
    ) {
        category.nav_order = -1
        category.category = category.title
        data.push({
            text: category.title,
            data: category,
            tags: category.tags,
            prefix: category.prefix,
            section: true,
            color: category.color,
            link: '',
            activeMatch: ' ',
        })
    })

    return data
}

let order: { [Key: string]: number }

/*
Recursively generate the navigation links for the sidebar.
*/
export function generateWikiSidebar(base: string, dir: string) {
    const data: {
        text: any
        data: { [key: string]: any }
        children?: any
        tags?: any
        prefix?: any
        section?: any
        color?: any
        link?: string
        activeMatch?: string
    }[] = []
    const files = fs.readdirSync(dir)

    files.forEach(function (file) {
        let joinedPath = path.join(dir, file)
        const stats = fs.statSync(joinedPath)
        // Handle top level directories
        if (
            stats.isDirectory() &&
            fs.existsSync(path.join(joinedPath, 'index.md'))
        ) {
            const str = fs.readFileSync(
                path.join(joinedPath, 'index.md'),
                'utf8'
            )
            let frontMatter
            try {
                frontMatter = matter(str)
            } catch (e) {
                joinedPath = path.relative(
                    process.cwd(),
                    path.join(joinedPath, 'index.md')
                )
                console.log(
                    // @ts-ignore
                    `::error file=${joinedPath},line=1,col=1::File ${joinedPath} has invalid frontmatter! ${e.message}`
                )
                throw new Error(
                    // @ts-ignore
                    `File ${joinedPath} has invalid frontmatter! ${e.message}`
                )
            }

            order = getCategoryOrder(frontMatter)

            const children = generateWikiSidebar(base, joinedPath).concat(
                getCategories(frontMatter)
            )

            children.sort(
                (
                    { data: dataA, text: textA },
                    { data: dataB, text: textB }
                ) => {
                    // Default to max int, so without nav order you will show second
                    // Multiply by category value if it exists
                    const navA =
                        (dataA.nav_order || 50) +
                        (order[dataA.category] || 0) * 100 ||
                        Number.MAX_SAFE_INTEGER
                    const navB =
                        (dataB.nav_order || 50) +
                        (order[dataB.category] || 0) * 100 ||
                        Number.MAX_SAFE_INTEGER

                    // Tie goes to the text compare! (Will also apply for elements without nav order)
                    if (navA == navB) {
                        return textA.localeCompare(textB)
                    }

                    // Return nav order
                    return navA - navB
                }
            )
            data.push({
                text: frontMatter.data.title,
                data: frontMatter.data,
                children: children,
            })

            if (frontMatter.data.title === void 0) {
                throw new Error(
                    'File ' +
                    path.join(joinedPath, 'index.md') +
                    ' has invalid frontmatter!'
                )
            }
        }

        // Handle the normal files
        else if (stats.isFile()) {
            // Don't include non-markdown files, or the index page itself
            if (!file.endsWith('.md') || file.endsWith('index.md')) return

            const str = fs.readFileSync(joinedPath, 'utf8')
            let frontMatter
            try {
                frontMatter = matter(str)
            } catch (e) {
                joinedPath = path.relative(process.cwd(), joinedPath)
                console.log(
                    // @ts-ignore
                    `::error file=${joinedPath},line=1,col=1::File ${joinedPath} has invalid frontmatter! ${e.message}`
                )
                throw new Error(
                    // @ts-ignore
                    `File ${joinedPath} has invalid frontmatter! ${e.message}`
                )
            }
            const link = formatLink(joinedPath.toString().replace(base, ''))

            // Don't include hidden pages (ignores children)
            if (frontMatter.data.hidden === true) return

            let prefix = null

            if (frontMatter.data.prefix != null) {
                prefix = frontMatter.data.prefix
            }

            let tags = null

            if (frontMatter.data.tags != null) {
                tags = frontMatter.data.tags
            }
            data.push({
                text: frontMatter.data.title,
                data: frontMatter.data,
                tags: tags,
                prefix: prefix,
                section: frontMatter.data.section || false,
                color: frontMatter.data.color || 'none',
                link,
                activeMatch: `^${link}`,
            })
            if (frontMatter.data.title === void 0) {
                joinedPath = path.relative(process.cwd(), joinedPath)
                console.log(
                    `::error file=${joinedPath},line=1,col=1::File ${joinedPath} has invalid frontmatter!`
                )
                throw new Error(`File ${joinedPath} has invalid frontmatter!`)
            }
        }
    })

    return data.sort(
        ({ data: dataA, text: textA }, { data: dataB, text: textB }) => {
            // Default to max int, so without nav order you will show second
            // Multiply by category value if it exists
            const navA =
                (dataA.nav_order || 50) + (order[dataA.category] || 0) * 100 ||
                Number.MAX_SAFE_INTEGER
            const navB =
                (dataB.nav_order || 50) + (order[dataB.category] || 0) * 100 ||
                Number.MAX_SAFE_INTEGER

            // Tie goes to the text compare! (Will also apply for elements without nav order)
            if (navA == navB) {
                return textA.localeCompare(textB)
            }

            // Return nav order
            return navA - navB
        }
    )
}