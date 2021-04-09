import {Grid, Header } from 'semantic-ui-react'
import ActivityList from './ActivitityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';


export default observer(function ActivityDashboard(){

  const {activityStore} = useStore();
  const {loadActivities, activityRegistry} = activityStore;
  
  useEffect(() => {
      if (activityRegistry.size <=1)
        loadActivities();
  }, [activityRegistry.size, loadActivities])

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading'/>

    return (
        <>
        <Header as='h2' icon='users' content='Reactivities'/>
        <Grid>   
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity filters</h2>  
            </Grid.Column>
        </Grid>
        </>
    )
})