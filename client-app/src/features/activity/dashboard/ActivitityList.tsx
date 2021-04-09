import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import {Link} from 'react-router-dom';


export default observer(function ActivityList(){
    const [target, setTarget] = useState('');

    const {activityStore} = useStore();
    const {activitiesByDate, loading} = activityStore;

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        console.log(e)
        activityStore.deleteActivity(id);
    }

    return(
        <Segment>
           <Item.Group divided>
                        {activitiesByDate.map((activity: Activity) => (
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as='a'>{activity.title}</Item.Header>
                                <Item.Meta>{activity.date}</Item.Meta>
                                <Item.Description>
                                    <div>{activity.description}</div>
                                    <div>{activity.city}, {activity.venue}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button 
                                        name={activity.id}
                                        loading={loading && target ===activity.id} 
                                        onClick={(e) => handleActivityDelete(e, activity.id)} 
                                        floated='right' 
                                        content='Delete' 
                                        color='red' />
                                    <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='View' color='blue' />
                                    <Label basic content={activity.category}/>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                        ))}
           </Item.Group>
        </Segment>
    )
})