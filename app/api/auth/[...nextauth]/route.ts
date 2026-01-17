import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'manager@test.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // Mock User Database
                const users = [
                    {
                        id: '1',
                        name: 'Manager User',
                        email: 'manager@test.com',
                        role: 'MANAGER',
                        password: 'password',
                    },
                    {
                        id: '2',
                        name: 'Store Keeper',
                        email: 'keeper@test.com',
                        role: 'STORE_KEEPER',
                        password: 'password',
                    },
                ];

                const user = users.find(
                    (u) =>
                        u.email === credentials?.email && u.password === credentials?.password
                );

                if (user) {
                    // Return user object without password
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    } as any;
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role;
                session.user.id = token.sub as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
});

export { handler as GET, handler as POST };
