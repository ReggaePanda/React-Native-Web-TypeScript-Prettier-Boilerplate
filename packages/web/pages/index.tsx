import get from 'lodash.get';
import { PureComponent } from 'react';
import { INextContextWithApollo } from '../types/NextContextWithApollo';

// Layout
import Page from '../layouts/main';

// GraphQl
import { meQuery } from '@myproject/controller';

// UI
import { LoginButton } from '@myproject/ui';

// Styles
import Link from 'next/link';
import { Button } from 'semantic-ui-react';
import '../assets/styles/styles.less';
import {
  LogoutComponent,
  MeComponent,
  OAuthAccountsComponent,
} from '../components/apollo-components';

export default class Index extends PureComponent {
  public static async getInitialProps({
    apolloClient,
  }: INextContextWithApollo) {
    const response: any = await apolloClient.query({
      query: meQuery,
    });
    return response.data.me || {};
  }

  public render() {
    return (
      <Page>
        <div>
          <Link href="c">
            <a>C</a>
          </Link>
          <MeComponent>
            {({ data, loading, error }) => {
              if (error) return null;
              if (loading) return <div>loading…</div>;

              const isLoggedIn = !!get(data, 'me', false);

              return (
                <div>
                  <LoginButton />
                  <h1>GreatGift</h1>
                  {isLoggedIn && (
                    <li key={data!.me!.id}>
                      <div>Test 1</div>
                      <OAuthAccountsComponent fetchPolicy="network-only">
                        {({
                          data: oData,
                          loading: oLoading,
                          error: oError,
                        }) => {
                          if (oError) return null;
                          if (oLoading) return <div>loading…</div>;

                          return <div>{JSON.stringify(oData)}</div>;
                        }}
                      </OAuthAccountsComponent>
                      <div>Test 3</div>
                      <LogoutComponent>
                        {(mutate, { client }) => (
                          <div>
                            <Button
                              onClick={async () => {
                                await mutate();
                                await client.resetStore();
                              }}
                            >
                              Logout
                            </Button>
                          </div>
                        )}
                      </LogoutComponent>
                    </li>
                  )}
                  {!isLoggedIn && (
                    <div>
                      <h2>Login</h2>
                      <Link passHref href="http://localhost:4000/auth/github">
                        <Button icon="github" />
                      </Link>
                      <Link passHref href="http://localhost:4000/auth/facebook">
                        <Button icon="facebook" />
                      </Link>
                      <Link passHref href="http://localhost:4000/auth/twitter">
                        <Button icon="twitter" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            }}
          </MeComponent>
        </div>
      </Page>
    );
  }
}
