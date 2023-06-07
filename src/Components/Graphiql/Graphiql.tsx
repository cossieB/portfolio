import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';

import 'graphiql/graphiql.css';
import { useEffect } from 'react';

const fetcher = createGraphiQLFetcher({ url: 'https://internet-games-database.vercel.app/api/graphql' });

export default function GraphiqlPage() {
    useEffect(() => {
        document.title = "GraphiQL"
    })
    return (
        <div style={{height: '100vh'}}>
            <GraphiQL fetcher={fetcher} />
        </div>
    )
}
