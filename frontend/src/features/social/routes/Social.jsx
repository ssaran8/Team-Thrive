import { ContentLayout} from "../../../components/Layout/ContentLayout"
import {CreatePost} from "../components/CreatePost";
import {Feed} from "../components/Feed";

export const Social = () => {
  return (
    <ContentLayout title={'Social Feed'}>
      <CreatePost />
      <Feed />
    </ContentLayout>
  );
}