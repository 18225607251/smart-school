import defaultSettings from '@/settings'

const title = defaultSettings.title || '智慧平安校园平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
