import { Container } from "@mui/system";
import { TestComponent } from "../components/TestComponent";
import { ContentLayout } from '../../../components/Layout/ContentLayout';


export const Settings = () => {
  return (
    <ContentLayout title={'Settings'}>
      <Container>
        <h1>Profile</h1>
        <TestComponent />
      </Container>
    </ContentLayout>
  );
}