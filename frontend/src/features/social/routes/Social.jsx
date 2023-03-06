import { ContentLayout} from "../../../components/Layout/ContentLayout"
import { Share } from "../components/Share";
import { Feed } from "../components/Feed";
import { Post } from "../components/Post";

export const Social = () => {
  return (
    <ContentLayout title={'Social Feed'}>
      <Share />
      <Post />
      <Feed />
    </ContentLayout>
  );
}