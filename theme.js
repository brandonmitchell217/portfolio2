const btn = document.querySelector('.themeBtn')

const prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)')

const currentTheme = localStorage.getItem('theme')

if (currentTheme == 'light') {
  document.body.classList.toggle('lightTheme')
} else if (currentTheme == 'dark') {
  document.body.classList.toggle('darkTheme')
}
lightBtn()

btn.addEventListener('click', function () {
  if (prefersLightScheme.matches) {
    document.body.classList.toggle('darkTheme')
    var theme = document.body.classList.contains('darkTheme') ? 'dark' : 'light'
  } else {
    document.body.classList.toggle('lightTheme')
    var theme = document.body.classList.contains('lightTheme')
      ? 'light'
      : 'dark'
  }
  localStorage.setItem('theme', theme)
  lightBtn()
})

function lightBtn() {
  if (document.body.classList.contains('lightTheme')) {
    btn.innerHTML = '<i class="fas fa-sun"></i>'
  } else {
    btn.innerHTML = '<i class="fas fa-moon"></i>'
  }
}
