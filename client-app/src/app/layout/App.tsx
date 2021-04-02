import { Fragment, useEffect, useState } from 'react';
import axios from 'axios'; 
import {Container, Header} from 'semantic-ui-react';
import {Activity} from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activity/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined >(undefined)
  const [editMode, setEditMode] = useState<boolean> (false);
  
  useEffect(() => {
 /*    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
     console.log(activities); */
     agent.Activities.list().then(response =>{
      console.log('zzold activities' );
      const oldActivities: Activity[] = response.slice();
      console.log(oldActivities);
    
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
       // activities.push(activity)
      });
      console.log('new activities')
      console.log(response);
   //   setActivities(response);
    })
  }, [])

  
  function handleSelectActivity(id: string){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen (id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
     : setActivities([...activities, {...activity, id: uuid()}]);
      console.log(activities) 
     setEditMode(false);
     setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string){
    setActivities([...activities.filter(x=> x.id !== id)])
  }

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '5em'}}>
      <Header as='h2' icon='users' content='Reactivities'/>
        <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEditActivity={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
