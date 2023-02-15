import { Container } from "@mui/system";
import { TestComponent } from "../components/TestComponent";
import { ContentLayout } from "../../../components/Layout/ContentLayout";

export const Calendar = () => {
  return (
    <ContentLayout title={'Calendar'}>
      <TestComponent />
    </ContentLayout>
  );
}