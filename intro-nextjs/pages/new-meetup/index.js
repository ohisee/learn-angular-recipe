/**
 * @fileoverview your-domain/new-meetup
 */
import NewMeetupForm from "../../components/meetups/NewMeetupForm";


function NewMeetupPage() {

  function addMeetupHandler(meetupData) {
    console.log(meetupData);
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>
}

export default NewMeetupPage;