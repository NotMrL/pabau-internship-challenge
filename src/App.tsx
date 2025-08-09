import './App.css'
import { ApolloClient, InMemoryCache, ApolloProvider, from, HttpLink } from '@apollo/client'
import { onError } from "@apollo/client/link/error";
import GetBrands from './Components/GetBrands';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrandInfo from './Components/BrandInfo';
import GuitarInfo from './Components/GuitarInfo';

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message}) => {
      alert(`GraphQL error ${message}`)
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: 'https://graphql-api-brown.vercel.app/api/graphql' })
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetBrands />} />
          <Route path="/brand/:name" element={<BrandInfo />} />
          <Route path="/guitar/:id" element={<GuitarInfo />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App
