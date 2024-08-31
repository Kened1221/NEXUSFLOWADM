import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import connectDB from '@/libs/mongodb';
import User from '@/models/user';

connectDB();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'usuario123',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '***********',
        },
      },
      async authorize({ username, password }) {
        try {
          const user = await User.findOne({ username });
          if (user && user.role === 'administrador') {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
              return {
                id: user.id,
                email: user.email,
                image: user.image,
                name: user.name,
                username: user.username,
                role: user.role,
              };
            }
          }
          return null;
        } catch (error) {
          console.error('Error in authorize:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.provider = account.provider;
        if (account.provider === 'credentials') {
          token.username = user.username;
          token.role = user.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        username: token.username,
        role: token.role,
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
