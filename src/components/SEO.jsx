import { memo } from 'react'
import { Helmet } from 'react-helmet-async'

const siteConfig = {
  title: 'Rudhram Enterprises | Venture Building Institution',
  description: 'Rudhram Enterprises is a venture-building institution creating transformative businesses across ceremonial experiences, creative expression, lifestyle, sound, and technology. Rooted in culture, driven by innovation.',
  url: 'https://rudhramenterprises.com',
  image: 'https://rudhramenterprises.com/images/og-image.png',
  siteName: 'Rudhram Enterprises',
  twitterHandle: '@rudhramgroup',
}

const pageSEO = {
  '/': {
    title: 'Rudhram Enterprises | Venture Building Institution | Culture, Innovation, Excellence',
    description: 'Rudhram Enterprises is a venture-building institution creating transformative businesses across ceremonial experiences, creative expression, lifestyle, sound, and technology. Rooted in culture, driven by innovation.',
    keywords: 'venture building, startup incubator, Rudhram Enterprises, Panigrahna, Aghhori, House of Joggi, Damrru, Tandavs, Kapaalik, Kalyannam, cultural ventures, innovation, India, Mumbai, venture studio, business incubation',
  },
  '/terms': {
    title: 'Terms of Service | Rudhram Enterprises',
    description: 'Terms and conditions governing access to and use of services, websites, and ventures operated by Rudhram Enterprises.',
    keywords: 'terms of service, terms and conditions, Rudhram Enterprises legal, venture building terms',
  },
  '/privacy': {
    title: 'Privacy Policy | Rudhram Enterprises',
    description: 'How Rudhram Enterprises collects, uses, and protects your personal information across our ventures and platforms.',
    keywords: 'privacy policy, data protection, GDPR, Rudhram Enterprises, startup privacy',
  },
}

const SEO = memo(function SEO({ path = '/' }) {
  const page = pageSEO[path] || pageSEO['/']
  const fullUrl = `${siteConfig.url}${path}`
  const fullTitle = page.title
  const description = page.description

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={page.keywords} />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={siteConfig.image} />
      <meta property="og:site_name" content={siteConfig.siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteConfig.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={siteConfig.image} />
    </Helmet>
  )
})

export default SEO
