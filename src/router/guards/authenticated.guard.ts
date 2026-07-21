import { useAuthStore } from "@/services/stores/auth"

export function authenticatedGuard(router: any) {
  router.beforeEach((to: any, from: any, next: any) => {
    if (to.meta.auth) {
      if (useAuthStore().isAuth) {
        next()
      } else {
        next({ path: '/login', query: { redirect: to.fullPath } })
      }
    } else {
      next()
    }
  })
}
