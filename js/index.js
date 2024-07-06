'use strict'
let banner

document.addEventListener('deviceready', async () => {
  await admob.start()

  banner = new admob.BannerAd({
    adUnitId: 'ca-app-pub-3177126348522768/6891289676',
  })

  await banner.show()
}, false)

app.initialize()
