import NextAuth, {SessionStrategy} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import loginFn from "./helpers/loginFn";
import GithhuProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import saveOAuthUser from "@/app/(__secure__)/backend_folders/helpers/saveOAthUser";


const authOptions = {
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge:  24 * 60 * 60// 24 hours
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? ""
    }),
    GithhuProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? ""
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {}
      },

      async authorize(credentials, req) {
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        // validate with zod

        // console.log({credentials})

        const loginFnRes = await loginFn({credentials})
        // console.log(loginFnRes)

        return loginFnRes
      }
      
    })
  ],
  pages: {
    signIn: '/login'
  },

  callbacks: {
    async signIn(allProps: any) {
      let type = allProps?.account?.type as string

      if (type !== 'credentials') {
        const details = {
          id: allProps?.user?.id,
          name: allProps?.user?.name,
          email: allProps?.user?.email
        }

        await saveOAuthUser(details)
      }
      
      // if (!profile?.email) {
      //   throw new Error('Email not found')
      // }

      return true// for the signin
    }
  }

}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };




/* 
  {
  user: {
    id: new ObjectId('65736e48f731dd473afd22f2'),
    name: 'den',
    email: 'den@gmail.com'
  },
  account: {
    providerAccountId: new ObjectId('65736e48f731dd473afd22f2'),
    type: 'credentials',
    provider: 'credentials'
  },
  credentials: {
    email: 'den@gmail.com',
    password: '12345',
    redirect: 'false',
    csrfToken: '59e00ff3d6c3b6f605ed1bd34cc182e19ba51db21afb4c75316116f9319ae1c5',
    callbackUrl: 'http://localhost:3000/login',
    json: 'true'
  }
}
?-------------------------------------------------------


{
  user: {
    id: '79311052',
    name: 'fireBrainsWiz',
    email: 'zaagomez@gmail.com',
    image: 'https://avatars.githubusercontent.com/u/79311052?v=4'
  },
  account: {
    provider: 'github',
    type: 'oauth',
    providerAccountId: '79311052',
    access_token: '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',
    token_type: 'bearer',
    scope: 'read:user,user:email'
  },
  profile: {
    login: 'fireBrainsWiz',
    id: 79311052,
    node_id: 'MDQ6VXNlcjc5MzExMDUy',
    avatar_url: 'https://avatars.githubusercontent.com/u/79311052?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/fireBrainsWiz',
    html_url: 'https://github.com/fireBrainsWiz',
    followers_url: 'https://api.github.com/users/fireBrainsWiz/followers',
    following_url: 'https://api.github.com/users/fireBrainsWiz/following{/other_user}',
    gists_url: 'https://api.github.com/users/fireBrainsWiz/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/fireBrainsWiz/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/fireBrainsWiz/subscriptions',
    organizations_url: 'https://api.github.com/users/fireBrainsWiz/orgs',
    repos_url: 'https://api.github.com/users/fireBrainsWiz/repos',
    events_url: 'https://api.github.com/users/fireBrainsWiz/events{/privacy}',
    received_events_url: 'https://api.github.com/users/fireBrainsWiz/received_events',
    type: 'User',
    site_admin: false,
    name: null,
    company: null,
    blog: '',
    location: null,
    email: 'zaagomez@gmail.com',
    hireable: null,
    bio: null,
    twitter_username: null,
    public_repos: 5,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: '2021-02-19T10:33:12Z',
    updated_at: '2023-11-20T14:40:59Z',
    private_gists: 0,
    total_private_repos: 7,
    owned_private_repos: 7,
    disk_usage: 102,
    collaborators: 0,
    two_factor_authentication: false,
    plan: {
      name: 'free',
      space: 976562499,
      collaborators: 0,
      private_repos: 10000
    }
  }
}
*/
