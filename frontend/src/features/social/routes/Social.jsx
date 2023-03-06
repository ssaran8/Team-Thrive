import { ContentLayout} from "../../../components/Layout/ContentLayout"
import { Share } from "../components/Share";
import { Feed } from "../components/Feed";

export const Social = () => {
  return (
    <ContentLayout title={'Social Feed'}>
      <Share />
      <Feed />
    </ContentLayout>
  );
}