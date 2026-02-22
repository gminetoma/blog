import type { Comment } from '~/lib/cms/types'

// TODO: Import generated documents once backend adds comment types:
// import { GetCommentsDocument, OnCommentAddedDocument } from "~/gql/graphql";
// import { useQuery, useSubscription } from "urql";

type UseCommentsProps = {
  slug: string
  initialComments: Comment[]
}

export const useComments = (props: UseCommentsProps) => {
  const { initialComments } = props

  // TODO: Fetch comments from API
  // const [{ data: queryData }] = useQuery({
  //   query: GetCommentsDocument,
  //   variables: { slug },
  // });

  // TODO: Subscribe to new comments
  // const [{ data: subscriptionData }] = useSubscription({
  //   query: OnCommentAddedDocument,
  //   variables: { slug },
  // });

  const comments = initialComments

  return { comments }
}
