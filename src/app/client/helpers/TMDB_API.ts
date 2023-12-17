const bearer_token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTE4NDkyY2E4ZWJjNjQ5MGI2NDNlNjExNDNmOWQ4ZSIsInN1YiI6IjY1MDAzNWIwZTBjYTdmMDBjYmVhN2E1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7gMFpzAUHuT0iYxA6vR7rkUh26DWhmP7jxgIz6leYNM'

export const TMDBOptions = {
  headers: {
    Authorization: bearer_token
  }
}

type TryLogInProps = {
  expires_at: string
  guest_session_id: string
  success: boolean
}


export default async function getGuessUserSession() : Promise<TryLogInProps> {
  const res = await fetch(
    'https://api.themoviedb.org/3/authentication/guest_session/new',
    {
      headers: {
        Authorization: bearer_token
      }
    }
  )
  let session = await res.json()

  // console.log(session)
  // sessionStorage.setItem('TMDB_guest_session_id', session.guest_session_id)
  // window.dispatchEvent(new Event('storage'))
  
  return session
}

export async function fetchTVShows() {
  const res = await fetch(
    'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', {
      headers: {
        Authorization: bearer_token
      }
    }
    )
}
/* 
Create Request Token
get https://api.themoviedb.org/3/authentication/token/new

?-----------------
Step 2: Ask the user for permission

With a request token (res.REQUEST_TOKEN) in hand, forward your user to the following URL:

// https://www.themoviedb.org/authenticate/{REQUEST_TOKEN}
https://www.themoviedb.org/authenticate/{REQUEST_TOKEN}?redirect_to=http://www.yourapp.com/approved



?-----------------
step 3
post https://api.themoviedb.org/3/authentication/session/new
 */

/* 







step 2
Create Session (with login)
post https://api.themoviedb.org/3/authentication/token/validate_with_login
 */