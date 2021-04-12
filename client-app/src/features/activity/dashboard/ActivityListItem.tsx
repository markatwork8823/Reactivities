import { SyntheticEvent } from "react";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Props {
  activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {
  const [target, setTarget] = useState("");

  const { activityStore } = useStore();
  const { loading } = activityStore;

  function handleActivityDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    console.log(e);
    activityStore.deleteActivity(id);
  }

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
          </Item>
          <Item.Content>
            <Item.Header a={Link} to={`/activities/${activity.id}`}>
              {activity.title}
            </Item.Header>
            <Item.Description>Hosted by Bob</Item.Description>
          </Item.Content>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {activity.date}
          <Icon name="marker" /> {activity.venue}
        </span>
      </Segment>
      <Segment secondary>Attendees</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color="teal"
          floated='right'
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
}
