import React from 'react';
import { useParams } from 'react-router-dom';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import sanitizeHtml from 'sanitize-html';

import { ensureHonestLinks } from '../../utils';
import Container from '../Container';
import Spinner from '../Spinner';

const UserDetails = props => {
  // Get user id from URL params
  const { userId } = useParams();

  useFirebaseConnect(`v0/user/${userId}`);
  // Fetch user details
  const user = useSelector(state => state.firebase.data.v0?.user?.[userId]);

  if (!isLoaded(user)) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container>
      <section>
        <dl>
          <dt>User</dt>
          <dd>{user.id}</dd>
          <dt>Created</dt>
          <dd>{new Date(user.created * 1_000).toString()}</dd>
          <dt>Karma</dt>
          <dd>{user.karma}</dd>
          {user.about && (
            <>
              <dt>About</dt>
              <dd
                dangerouslySetInnerHTML={{
                  __html: ensureHonestLinks(sanitizeHtml(user.about))
                }}
              ></dd>
            </>
          )}
        </dl>
      </section>
    </Container>
  );
};

export default UserDetails;
