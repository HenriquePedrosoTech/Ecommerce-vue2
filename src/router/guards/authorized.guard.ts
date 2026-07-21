import { useAuthStore } from "@/services/stores/auth"
export function authorizedGuard(router: any) {

  router.beforeEach((to: any, from: any, next: any) => {
    if( to.meta?.role?.length > 0) {
      if(to.meta.role.includes(useAuthStore().getRole)) {
        next()
      } else {
        return
      }
    } else {
      next()
    }
  })
}
