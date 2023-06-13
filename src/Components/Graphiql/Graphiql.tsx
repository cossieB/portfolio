import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';

import 'graphiql/graphiql.css';
import { useEffect } from 'react';

const fetcher = createGraphiQLFetcher({ url: 'https://internet-games-database.vercel.app/api/graphql' });

const exampleQuery = `#graphql
query ExampleQuery($gameId: ID!) {
    game(id: $gameId) {
        title
        releaseDate
        developer {
            name
            location
            country
        }
        publisher {
            name
            headquarters
            country
        }
    }
}
`

export default function GraphiqlPage() {
    useEffect(() => {
        document.title = "GraphiQL"
    })
    return (
        <div style={{height: '100vh'}}>
            <GraphiQL defaultQuery={exampleQuery} variables={`{"gameId":"2953b48c-36c2-47a2-b3f3-0af9557a2855"}`} fetcher={fetcher} />
        </div>
    )
}
