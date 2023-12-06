export const enum ROUTE {
  HOME = '/',
  PAGE_NOT_FOUND = '/404',

  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',

  PROFILE = '/profile',

  DEVICES = `/devices`,
  ADD_DEVICE = `${ROUTE.DEVICES}/add`,
  EDIT_DEVICE = `${ROUTE.DEVICES}/edit`,

  ADMIN_USER = '/admin-user',
  ADMIN_DEVICES = '/admin-devices',
}
