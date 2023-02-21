import { Container } from "@mui/system";
import { TestComponent } from "../components/TestComponent";
import { ContentLayout } from "../../../components/Layout/ContentLayout";
import { TasksContext } from "../../../routes/protected";

export const Calendar = () => {
  return (
    <ContentLayout title={'Calendar'}>
      <TasksContext.Consumer>
        {({tasks, setTasks}) => <TestComponent tasks={tasks}/> }
      </TasksContext.Consumer>
    </ContentLayout>
  );
}