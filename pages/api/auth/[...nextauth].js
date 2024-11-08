import {
  GetMembership,
  getMembershipLevel,
  GetMembershipOrganization,
  GetMembershipProduct,
  GetMembershipType,
  GetUser,
  LoginUser,
} from '@/functions/membersuite/auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

function createUserObj(
  token,
  user,
  membership,
  membershipType,
  membershipProduct,
  membershipOrganization,
  membershipLevel
) {
  return {
    accessToken: token,
    accessTokenExpires: new Date().getTime() + 3600 * 1000,
    userId: user?.userId,
    email: user?.email,
    firstName: user?.firstName,
    lastName: user?.lastName,
    membership: {
      type: membershipType?.name,
      product: membershipProduct?.productName,
      organization: membershipOrganization?.name,
      memberSince: membership?.joinDate,
      renewAt: membership?.renewalDate,
      expireAt: membership?.expirationDate,
      dueAmount: membership?.currentDuesAmount,
      level: membershipLevel[0]?.membership
        ? membershipLevel[0]?.membership
        : 'market-research',
    },
  }
}

export default NextAuth({
  pages: {
    signIn: '/portal/',
    signOut: '/logout/',
    error: '/portal/',
  },
  providers: [
    CredentialsProvider({
      id: 'un-pw-login',
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'username',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const token = await LoginUser(credentials)

        if (token) {
          const user = await GetUser(token)
          const membership = await GetMembership(token, user?.membershipId)
          const membershipType = await GetMembershipType(
            token,
            membership?.type
          )
          const membershipProduct = await GetMembershipProduct(
            token,
            membership?.product
          )
          const membershipOrganization = await GetMembershipOrganization(
            token,
            membership?.membershipOrganization
          )
          const membershipLevel = await getMembershipLevel(user?.email)

          if (user) {
            return createUserObj(
              token,
              user,
              membership,
              membershipType,
              membershipProduct,
              membershipOrganization,
              membershipLevel
            )
          }
        }
        return null
      },
    }),
  ],
  session: {
    jwt: true,
  },
  secret: process.env.JWT_SECRET_KEY,
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = user
      }
      return token
    },
    async session({ session, token }) {
      session = token
      return session
    },
  },
})
