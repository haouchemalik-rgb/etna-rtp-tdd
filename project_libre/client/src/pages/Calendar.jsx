import React, { useContext, useEffect, useState } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { addSeminary, deleteSeminary, getAllseminary, updatedSeminary } from '../services/semary.service';
import { Header } from '../components';
import { UserContext } from '../contexts/UserContext';

const Scheduler = () => {
  const {user} = useContext(UserContext);
  const [, setScheduleObj] = useState();

  const onDragStart = (arg) => {
    arg.navigation.enable = true;
  };
  const [ semina, setsemina ] = useState();
  
  useEffect(() => {
        refreshCalendar()
    }, []);


  const refreshCalendar = () => {
    getAllseminary()
    .then((res) => {
      if (res.status === 200) {
        setsemina(res.data);
      }
    });
  }

  const actionComplete = (state) => {
    console.log(state);
    if (state.addedRecords && state.addedRecords.length > 0) {
      const seminary = state.addedRecords[0];
      addSeminary({
        Subject: seminary.Subject,
        EndTime: seminary.EndTime,
        StartTime: seminary.StartTime,
        IsAllDay: seminary.IsAllDay,
      }).then((res) => {
        if (res.status === 200){
          refreshCalendar();
        }
      })
      refreshCalendar();
    } else if (state.changedRecords && state.changedRecords.length > 0){
      const seminary = state.changedRecords[0];
      updatedSeminary(seminary.id, {
        Subject: seminary.Subject,
        EndTime: seminary.EndTime,
        StartTime: seminary.StartTime,
        IsAllDay: seminary.IsAllDay,
      }).then((res) => {
        if (res.status === 200){
          refreshCalendar();
        }
      });
      refreshCalendar();
    } else if (state.deletedRecords && state.deletedRecords.length > 0){
      console.log('hello');
      const seminary = state.deletedRecords[0];
      deleteSeminary(seminary.id)
        .then((res) => {
          if (res.status === 200) {
            refreshCalendar();
          }
        })

      refreshCalendar();
    }
    refreshCalendar();
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Calendar" />
      <ScheduleComponent
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)}
        eventSettings={{
          dataSource: semina,
          allowEditing: user && user.admin,
          allowAdding: user && user.admin,
          allowDeleting: user && user.admin,
          editFollowingEvents: user && user.admin
      }}
        dragStart={onDragStart}
        actionComplete={actionComplete}
      >
        <ViewsDirective>
          { ['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={item} />)}
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
    </div>
  );
};

export default Scheduler;
