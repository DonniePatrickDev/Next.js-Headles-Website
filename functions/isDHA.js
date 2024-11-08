export default function isDHA(asPath) {
  return (
    asPath === '/analytics' ||
    asPath.includes('/portal') ||
    asPath === '/market-research' ||
    asPath === '/dhmw-provider-portal' ||
    asPath.includes('/market-insights')
  )
}
