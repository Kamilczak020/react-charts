import * as React from 'react';
import { BaseContainer } from 'app/containers/BaseContainer';
import { eachDayOfInterval } from 'date-fns';
import { randomInRange } from 'app/util/math';
import { ParticipationChart } from 'app/components/ParticipationChart';

export class HomePage extends React.Component {

  public render() {
    const dates = eachDayOfInterval({ start: new Date(2019, 0, 1), end: new Date(2019, 11, 31) });
    const data = dates.map((date) => ({ date, count: randomInRange(0, 5) }));

    return (
      <BaseContainer>
        <ParticipationChart size={800} data={data} />
      </BaseContainer>
    );
  }
}
