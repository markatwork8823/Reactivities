import { Fragment, useEffect, useState } from 'react';
import {Container, Header} from 'semantic-ui-react';
import {Activity} from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activity/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const {activityStore} = useStore();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
     activityStore.loadActivities();
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading'/>

  return (
    <Fragment>
      <NavBar/>
      <Container style={{marginTop: '5em'}}>
      <Header as='h2' icon='users' content='Reactivities'/>
        <ActivityDashboard 
        />
      </Container>
    </Fragment>
  );
}

export default observer(App);
