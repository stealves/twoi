import { noise } from "./utils/noise.js"

window.Webflow ||= []
window.Webflow.push(() => {
  // Dynamic copyright year
  Webflow.push(function () {
    const thisYear = new Date().getFullYear()
    document.querySelector('.copyright-year').textContent = thisYear
  })

  // Hero paragraph
  const menuToogle = document.querySelector('.toogle')
  let lastWord = document.querySelectorAll('.last-word')

  if (lastWord !== 'null') {
    for (let i = 0; i < lastWord.length; i++) {
      let lastWordTop = lastWord[i].offsetTop
      let lastWordheight = lastWord[i].offsetHeight

      let headerParagraph = lastWord[i].parentElement.querySelector(':scope > .header-paragraph')

      headerParagraph.style.top = lastWordTop + lastWordheight + 'px'
    }
  }

  function windowResizing() {
    if (lastWord !== 'null') {
      for (let i = 0; i < lastWord.length; i++) {
        let lastWordTop = lastWord[i].offsetTop
        let lastWordheight = lastWord[i].offsetHeight

        let headerParagraph = lastWord[i].parentElement.querySelector(':scope > .header-paragraph')

        headerParagraph.style.top = lastWordTop + lastWordheight + 'px'
      }
    }

  }
  window.onresize = windowResizing

  // Color theme switcher
  const modeBtn = document.querySelector('.mode-switch')
  const currentBodyTheme = document.body.classList.contains("light-mode")

  if (localStorage.getItem('theme') === 'light' && !currentBodyTheme) {
    document.body.classList.add('light-mode')
  } else if (localStorage.getItem('theme') === 'dark' && currentBodyTheme) {
    document.body.classList.remove('light-mode')
  }

  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      document.body.classList.toggle("light-mode")
      let theme = document.body.classList.contains("light-mode") ? "light" : "dark"
      localStorage.setItem("theme", theme)
    })
  }

  // Noise background
  noise()
})
