import path from 'node:path'
import puppeteer, { type Browser, type Page } from 'puppeteer'
import { type ViteDevServer, createServer } from 'vite'

describe('crs spa', () => {
  let browser: Browser
  let page: Page
  let server: ViteDevServer

  beforeAll(async () => {
    try {
      server = await createServer({
        root: path.resolve(__dirname, '../playground/spa'),
        configFile: path.resolve(__dirname, '../playground/spa/vite.config.ts'),
        server: {
          port: 9527,
        },
      })

      await server.listen()
    } catch (e) {
      console.log('createServer failed', path.resolve(__dirname, '../playground/spa/vite.config.ts'))
      console.error(e)
    }

    browser = await puppeteer.launch({ headless: true })
    page = await browser.newPage()

    await page.goto('http://localhost:9527')
  })

  afterAll(async () => {
    await browser.close()
    await server.close()
  })

  test('should have title', async () => {
    const title = await page.title()
    expect(title).toBe('vite-plugin-i18n-detector-demo')
  })

  test('should have lang', async () => {
    await page.click('#en')
    await page.waitForSelector('#en')

    const text = await page.evaluate(() => {
      const lang = document.querySelector('#language')
      return lang?.textContent
    })

    expect(text).toBe('en')
  })

  test('should change language to zh', async () => {
    await page.click('#zh')
    await page.waitForSelector('#zh')

    const text = await page.evaluate(() => {
      const lang = document.querySelector('#language')
      return lang?.textContent
    })

    expect(text).toBe('中文')
  })
})