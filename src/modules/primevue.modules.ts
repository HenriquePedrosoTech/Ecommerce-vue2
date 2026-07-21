import type { App } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { InputText, Password } from 'primevue'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

export function setPrimeVue(app: App): void {

  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.p-dark',
      },
    },
  })


  app.use(ToastService)

  app.component('Button', Button)
  app.component('Card', Card)
  app.component('InputText', InputText)
  app.component('Password', Password)
  app.component('Toast', Toast)
}
