import { initialize } from '@bcwdev/auth0provider-client'
import { AppState } from '../AppState'
import { audience, clientId, domain } from '../AuthConfig'
import router from '../router'
import { setBearer } from './AxiosService'
import { accountService } from './AccountService'
import { bugsService } from './BugsService'
import { notesService } from './NotesService'

export const AuthService = initialize({
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, async function() {
  setBearer(AuthService.bearer)
  await accountService.getAccount()
  AppState.user = AuthService.user
  console.log(router)
  if (router.currentRoute._value.name === 'BugDetails') {
    debugger
    await bugsService.getOne(router.currentRoute._value.params.id)
    await notesService.getAllNotes(router.currentRoute._value.params.id)
  }
  // NOTE if there is something you want to do once the user is authenticated, place that here
})
