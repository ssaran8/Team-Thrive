import { ContentLayout} from "../../../components/Layout/ContentLayout"
import {CreatePost} from "../components/CreatePost";

export const Social = () => {
  return (
    <ContentLayout title={'Social Feed'}>
      <CreatePost />
    </ContentLayout>
  );
}