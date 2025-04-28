
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql", // Your GraphQL server URL
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token") // or get from a context/store

    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
        },
    }
})

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})