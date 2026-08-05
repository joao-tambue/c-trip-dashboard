const membros = [{
  name: 'Anthony Fu',
  username: 'antfu',
  role: 'membro',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/antfu' }
}, {
  name: 'Baptiste Leproux',
  username: 'larbish',
  role: 'membro',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/larbish' }
}, {
  name: 'Benjamin Canac',
  username: 'benjamincanac',
  role: 'dono',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/benjamincanac' }
}, {
  name: 'Céline Dumerc',
  username: 'celinedumerc',
  role: 'membro',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/celinedumerc' }
}, {
  name: 'Daniel Roe',
  username: 'danielroe',
  role: 'membro',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/danielroe' }
}, {
  name: 'Farnabaz',
  username: 'farnabaz',
  role: 'membro',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/farnabaz' }
}, {
  name: 'Ferdinand Coumau',
  username: 'FerdinandCoumau',
  role: 'membro',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/FerdinandCoumau' }
}, {
  name: 'Hugo Richard',
  username: 'hugorcd',
  role: 'dono',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/hugorcd' }
}, {
  name: 'Pooya Parsa',
  username: 'pi0',
  role: 'membro',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/pi0' }
}, {
  name: 'Sarah Moriceau',
  username: 'SarahM19',
  role: 'membro',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/SarahM19' }
}, {
  name: 'Sébastien Chopin',
  username: 'Atinux',
  role: 'dono',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux' }
}]

export default eventHandler(async () => {
  return membros
})
